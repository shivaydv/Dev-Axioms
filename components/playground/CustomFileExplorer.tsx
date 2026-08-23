"use client";

import { useState } from "react";
import { useSandpack, SandpackFileExplorer } from "@codesandbox/sandpack-react";
import { FolderMinus, FilePlus, Trash2 } from "lucide-react";

function FileCRUDHeader({ onCollapseAll }: { onCollapseAll: () => void }) {
  const { sandpack } = useSandpack();
  const [isAdding, setIsAdding] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const protectedFiles = ["/App.js", "/index.js", "/package.json", "/styles.css", "/public/index.html"];
  
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) {
      setIsAdding(false);
      return;
    }
    
    let path = newFileName.trim();
    if (!path.startsWith("/")) path = "/" + path;
    
    if (sandpack.files[path]) {
      alert("File already exists");
      return;
    }
    
    // Use the object form of updateFile to explicitly set hidden to false
    sandpack.updateFile({
      [path]: { code: "// New file", hidden: false }
    });
    
    // We need to wait a tick before setting active to allow state to update
    setTimeout(() => {
      if (sandpack.openFile) {
        sandpack.openFile(path);
      }
      sandpack.setActiveFile(path);
    }, 50);
    
    setNewFileName("");
    setIsAdding(false);
  };
  
  const handleDeleteConfirm = () => {
    const active = sandpack.activeFile;
    if (protectedFiles.includes(active)) return;
    
    sandpack.deleteFile(active);
    sandpack.setActiveFile("/App.js");
    setIsDeleting(false);
  };

  const active = sandpack.activeFile;
  const isProtected = protectedFiles.includes(active);

  return (
    <div className="flex flex-col shrink-0 border-b border-[#333]">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground bg-[#1e1e1e] px-3 py-1.5 font-semibold flex justify-between items-center shrink-0">
        <span>Files</span>
        <div className="flex gap-2">
          <button 
            onClick={onCollapseAll} 
            className="hover:text-white transition-colors" 
            title="Collapse All Folders"
          >
            <FolderMinus className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => { setIsAdding(!isAdding); setIsDeleting(false); }} 
            className="hover:text-white transition-colors" 
            title="New File"
          >
            <FilePlus className="w-3.5 h-3.5" />
          </button>
          {!isProtected && (
            <button 
              onClick={() => { setIsDeleting(!isDeleting); setIsAdding(false); }} 
              className="hover:text-red-400 transition-colors" 
              title="Delete Active File"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
      
      {isAdding && (
        <div className="px-2 py-1.5 bg-[#0a0a0a]">
          <form onSubmit={handleAddSubmit} className="flex gap-2">
            <input
              type="text"
              autoFocus
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="/components/UI.tsx"
              className="flex-1 bg-[#151515] border border-[#333] rounded px-2 py-0.5 text-[10px] text-white focus:outline-none focus:border-[#FF5A26]"
            />
            <button type="submit" className="text-[10px] bg-[#FF5A26] text-white px-2 py-0.5 rounded hover:bg-[#ff6e42] transition-colors">
              Add
            </button>
          </form>
        </div>
      )}
      
      {isDeleting && (
        <div className="px-2 py-1.5 bg-red-950/30 flex justify-between items-center gap-2">
          <span className="text-[10px] text-red-200 truncate">Delete {active}?</span>
          <div className="flex gap-1 shrink-0">
            <button onClick={() => setIsDeleting(false)} className="text-[10px] px-1.5 py-0.5 rounded bg-[#333] hover:bg-[#444] text-white transition-colors">Cancel</button>
            <button onClick={handleDeleteConfirm} className="text-[10px] px-1.5 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white transition-colors">Confirm</button>
          </div>
        </div>
      )}
    </div>
  )
}

export function CustomFileExplorer() {
  const { sandpack } = useSandpack();
  const [collapseKey, setCollapseKey] = useState(0);
  
  const allFolders = Object.keys(sandpack.files)
    .map(f => {
      const parts = f.split('/');
      parts.pop(); // remove file name
      return parts.join('/');
    })
    .filter(f => f !== '')
    .filter((v, i, a) => a.indexOf(v) === i);
    
  // Sandpack's internal directory representation can sometimes have trailing slashes
  // or omit leading slashes. We provide all variations to guarantee they collapse.
  const allVariations = [
    ...allFolders,
    ...allFolders.map(f => f + '/'),
    ...allFolders.map(f => f.replace(/^\//, '')),
    ...allFolders.map(f => f.replace(/^\//, '') + '/')
  ];
    
  return (
    <div className="h-full flex flex-col">
      <FileCRUDHeader onCollapseAll={() => setCollapseKey(k => k + 1)} />
      <div className="flex-1 overflow-auto [&_.sp-file-explorer]:h-full [&_.sp-file-explorer]:!bg-transparent [&_.sp-file-explorer]:text-xs">
        <SandpackFileExplorer key={collapseKey} autoHiddenFiles={false} initialCollapsedFolder={allVariations} />
      </div>
    </div>
  );
}
