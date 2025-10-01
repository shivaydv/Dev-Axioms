import { Code, Palette, Globe, FileCode } from "lucide-react";

// Built-in default templates for advanced file manager
export const DEFAULT_TEMPLATES = {
  "React Component jsx": {
    icon: Code,
    content: `
export default function Component() {
  return (
    <div>
      <h1>New Component</h1>
    </div>
  );
}`,
  },
  "React Component tsx": {
    icon: Code,
    content: `import React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function Component({ children, className }: Props) {
  return (
    <div className={className}>
      <h1>New Component</h1>
      {children}
    </div>
  );
}`,
  },
  "React Hook": {
    icon: Code,
    content: `import { useState, useEffect, useCallback } from 'react';

interface UseCustomHookReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  reset: () => void;
}

export function useCustomHook<T = any>(initialValue?: T): UseCustomHookReturn<T> {
  const [data, setData] = useState<T | null>(initialValue || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    // Add your data fetching logic here
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const reset = useCallback(() => {
    setData(initialValue || null);
    setError(null);
    setLoading(false);
  }, [initialValue]);

  useEffect(() => {
    // Effect logic here
  }, []);

  return { 
    data, 
    loading, 
    error,
    refetch,
    reset,
  };
}`,
  },
  "JavaScript File": {
    icon: FileCode,
    content: `// JavaScript module
export function example() {
  console.log('Hello, JavaScript!');
}`,
  },
  "TypeScript File": {
    icon: FileCode,
    content: `// TypeScript file
export interface Example {
  id: string;
  name: string;
}

export function example(): void {
  console.log('Hello, TypeScript!');
}`,
  },
  "HTML Document": {
    icon: Globe,
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 2rem;
            background: #f5f5f5;
        }
    </style>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Start building your page here.</p>
</body>
</html>`,
  },
  "CSS Module": {
    icon: Palette,
    content: `/* Component styles */
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.header {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary);
}

.content {
  flex: 1;
  background: var(--color-background);
  border-radius: 0.5rem;
  padding: 1rem;
}`,
  },
};

export const defaultFileNameValidator = (filename: string): string | null => {
  if (!filename.trim()) return "Filename cannot be empty";
  if (filename.includes("..")) return "Invalid filename";
  if (!/^[a-zA-Z0-9_\-./]+$/.test(filename))
    return "Filename contains invalid characters";
  return null;
};
