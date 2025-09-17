export function truncateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

export function getLanguageFromFileName(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "js":
    case "mjs":
      return "javascript";
    case "jsx":
      return "javascript";
    case "ts":
      return "typescript";
    case "tsx":
      return "javascript"; // This is the key fix! as editor does not have 'tsx'
    case "css":
      return "css";
    case "html":
    case "htm":
      return "html";
    case "json":
      return "json";
    case "md":
    case "markdown":
      return "markdown";
    case "xml":
      return "xml";
    case "yaml":
    case "yml":
      return "yaml";
    case "scss":
    case "sass":
      return "scss";
    case "less":
      return "less";
    case "php":
      return "php";
    case "py":
    case "python":
      return "python";
    case "java":
      return "java";
    case "c":
      return "c";
    case "cpp":
    case "cxx":
    case "cc":
      return "cpp";
    case "cs":
      return "csharp";
    case "go":
      return "go";
    case "rs":
    case "rust":
      return "rust";
    case "rb":
    case "ruby":
      return "ruby";
    case "sh":
    case "bash":
      return "shell";
    default:
      return "plaintext";
  }
}
