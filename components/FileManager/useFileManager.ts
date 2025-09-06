import { useState, useCallback } from "react";
import { SandpackFiles, SandpackFile } from "@codesandbox/sandpack-react";

export interface UseFileManagerOptions {
  initialFiles?: SandpackFiles;
  onFilesChange?: (files: SandpackFiles) => void;
  validateFileName?: (filename: string) => string | null; // Return error message or null
  maxFiles?: number;
}

export interface FileManagerState {
  files: SandpackFiles;
  activeFile: string;
  isDirty: boolean;
  errors: Record<string, string>;
}

export interface FileManagerActions {
  setActiveFile: (filename: string) => void;
  updateFile: (filename: string, updates: Partial<SandpackFile>) => void;
  addFile: (
    filename: string,
    content?: string,
    options?: Partial<SandpackFile>,
  ) => boolean;
  removeFile: (filename: string) => boolean;
  renameFile: (oldName: string, newName: string) => boolean;
  duplicateFile: (filename: string, newName?: string) => boolean;
  resetFiles: () => void;
  setFiles: (files: SandpackFiles) => void;
  getFileContent: (filename: string) => string;
  validateFiles: () => Record<string, string>;
}

export function useFileManager(options: UseFileManagerOptions = {}) {
  const {
    initialFiles = {
      "/index.js": { code: "// Start coding here", active: true },
    },
    onFilesChange,
    validateFileName,
    maxFiles = 20,
  } = options;

  const [state, setState] = useState<FileManagerState>(() => {
    const firstFile = Object.keys(initialFiles)[0];
    const activeFile =
      Object.keys(initialFiles).find((key) => {
        const file = initialFiles[key];
        return typeof file === "object" && file.active;
      }) || firstFile;

    return {
      files: initialFiles,
      activeFile: activeFile || "",
      isDirty: false,
      errors: {},
    };
  });

  const updateState = useCallback(
    (updates: Partial<FileManagerState>) => {
      setState((prev) => {
        const newState = { ...prev, ...updates, isDirty: true };
        if (updates.files) {
          onFilesChange?.(updates.files);
        }
        return newState;
      });
    },
    [onFilesChange],
  );

  const setActiveFile = useCallback(
    (filename: string) => {
      if (state.files[filename]) {
        updateState({ activeFile: filename });
      }
    },
    [state.files, updateState],
  );

  const updateFile = useCallback(
    (filename: string, updates: Partial<SandpackFile>) => {
      const existingFile = state.files[filename];
      if (!existingFile) return;

      const file =
        typeof existingFile === "string"
          ? { code: existingFile }
          : existingFile;
      const updatedFile = { ...file, ...updates };
      const newFiles = { ...state.files, [filename]: updatedFile };

      updateState({ files: newFiles });
    },
    [state.files, updateState],
  );

  const addFile = useCallback(
    (filename: string, content = "", options: Partial<SandpackFile> = {}) => {
      // Validate filename
      if (validateFileName) {
        const error = validateFileName(filename);
        if (error) {
          updateState({
            errors: { ...state.errors, [filename]: error },
          });
          return false;
        }
      }

      // Check if file already exists
      if (state.files[filename]) {
        updateState({
          errors: { ...state.errors, [filename]: "File already exists" },
        });
        return false;
      }

      // Check max files limit
      if (Object.keys(state.files).length >= maxFiles) {
        updateState({
          errors: {
            ...state.errors,
            [filename]: `Maximum ${maxFiles} files allowed`,
          },
        });
        return false;
      }

      const normalizedFilename = filename.startsWith("/")
        ? filename
        : `/${filename}`;
      const newFile: SandpackFile = { code: content, ...options };
      const newFiles = { ...state.files, [normalizedFilename]: newFile };

      updateState({
        files: newFiles,
        activeFile: normalizedFilename,
        errors: { ...state.errors, [filename]: "" }, // Clear any previous errors
      });

      return true;
    },
    [state.files, state.errors, validateFileName, maxFiles, updateState],
  );

  const removeFile = useCallback(
    (filename: string) => {
      const fileKeys = Object.keys(state.files);

      // Don't allow removing the last file
      if (fileKeys.length <= 1) {
        updateState({
          errors: {
            ...state.errors,
            [filename]: "Cannot remove the last file",
          },
        });
        return false;
      }

      const { [filename]: removed, ...remainingFiles } = state.files;

      // If removing active file, switch to another file
      let newActiveFile = state.activeFile;
      if (state.activeFile === filename) {
        newActiveFile = Object.keys(remainingFiles)[0];
      }

      updateState({
        files: remainingFiles,
        activeFile: newActiveFile,
        errors: { ...state.errors, [filename]: "" },
      });

      return true;
    },
    [state.files, state.activeFile, state.errors, updateState],
  );

  const renameFile = useCallback(
    (oldName: string, newName: string) => {
      if (!state.files[oldName] || state.files[newName]) {
        return false;
      }

      if (validateFileName) {
        const error = validateFileName(newName);
        if (error) {
          updateState({
            errors: { ...state.errors, [newName]: error },
          });
          return false;
        }
      }

      const normalizedNewName = newName.startsWith("/")
        ? newName
        : `/${newName}`;
      const file = state.files[oldName];
      const { [oldName]: removed, ...otherFiles } = state.files;
      const newFiles = { ...otherFiles, [normalizedNewName]: file };

      updateState({
        files: newFiles,
        activeFile:
          state.activeFile === oldName ? normalizedNewName : state.activeFile,
        errors: { ...state.errors, [newName]: "" },
      });

      return true;
    },
    [
      state.files,
      state.activeFile,
      state.errors,
      validateFileName,
      updateState,
    ],
  );

  const duplicateFile = useCallback(
    (filename: string, newName?: string) => {
      const existingFile = state.files[filename];
      if (!existingFile) return false;

      const baseName = filename.replace(/\.[^/.]+$/, ""); // Remove extension
      const extension = filename.match(/\.[^/.]+$/)?.[0] || "";
      const defaultNewName = `${baseName}-copy${extension}`;
      const targetName = newName || defaultNewName;

      const file =
        typeof existingFile === "string"
          ? { code: existingFile }
          : existingFile;
      return addFile(targetName, file.code, { ...file, active: false });
    },
    [state.files, addFile],
  );

  const resetFiles = useCallback(() => {
    const firstFile = Object.keys(initialFiles)[0];
    const activeFile =
      Object.keys(initialFiles).find((key) => {
        const file = initialFiles[key];
        return typeof file === "object" && file.active;
      }) || firstFile;

    setState({
      files: initialFiles,
      activeFile: activeFile || "",
      isDirty: false,
      errors: {},
    });

    onFilesChange?.(initialFiles);
  }, [initialFiles, onFilesChange]);

  const setFiles = useCallback(
    (files: SandpackFiles) => {
      const firstFile = Object.keys(files)[0];
      const activeFile =
        Object.keys(files).find((key) => {
          const file = files[key];
          return typeof file === "object" && file.active;
        }) || firstFile;

      updateState({
        files,
        activeFile: activeFile || "",
        errors: {},
      });
    },
    [updateState],
  );

  const getFileContent = useCallback(
    (filename: string): string => {
      const file = state.files[filename];
      if (!file) return "";
      return typeof file === "string" ? file : file.code;
    },
    [state.files],
  );

  const validateFiles = useCallback((): Record<string, string> => {
    const errors: Record<string, string> = {};

    Object.keys(state.files).forEach((filename) => {
      if (validateFileName) {
        const error = validateFileName(filename);
        if (error) {
          errors[filename] = error;
        }
      }
    });

    return errors;
  }, [state.files, validateFileName]);

  const actions: FileManagerActions = {
    setActiveFile,
    updateFile,
    addFile,
    removeFile,
    renameFile,
    duplicateFile,
    resetFiles,
    setFiles,
    getFileContent,
    validateFiles,
  };

  return [state, actions] as const;
}
