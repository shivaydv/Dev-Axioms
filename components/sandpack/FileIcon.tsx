import { FileText, Code, Settings } from "lucide-react";

interface FileIconProps {
  fileName: string;
  className?: string;
}

export const FileIcon = ({
  fileName,
  className = "w-3 h-3",
}: FileIconProps) => {
  const getIcon = () => {
    if (fileName.endsWith(".tsx") || fileName.endsWith(".jsx")) {
      return <Code className={`${className} text-blue-400`} />;
    }
    if (fileName.endsWith(".ts")) {
      return <Code className={`${className} text-blue-600`} />;
    }
    if (fileName.endsWith(".js")) {
      return <Code className={`${className} text-yellow-400`} />;
    }
    if (fileName.endsWith(".json")) {
      return <Settings className={`${className} text-gray-400`} />;
    }
    return <FileText className={`${className} text-gray-400`} />;
  };

  return getIcon();
};
