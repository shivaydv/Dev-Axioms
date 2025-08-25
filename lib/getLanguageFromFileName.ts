export const getLanguageFromFileName = (fileName: string) => {
  const extension = fileName.split(".").pop();
  switch (extension) {
    case "tsx":
    case "jsx":
      return "javascript"; // Treat both JSX and TSX as JavaScript for consistent formatting
    case "ts":
      return "typescript";
    case "js":
      return "javascript";
    case "json":
      return "json";
    case "html":
      return "html";
    case "css":
      return "css";
    default:
      return "javascript";
  }
};
