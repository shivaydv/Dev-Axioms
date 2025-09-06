"use client";

import { useState } from "react";

import AdvancedFileManager from "@/components/FileManager/AdvancedFileManager";
import { SandpackFiles } from "@codesandbox/sandpack-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import FileManagerFormExample from "@/components/examples/file-manager-form";

const initialFiles = {
  "/App.tsx": {
    code: `import React from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="app">
      <h1>React Counter App</h1>
      <div className="counter">
        <button onClick={() => setCount(count - 1)}>-</button>
        <span className="count">{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}`,
    active: true,
  },
  "/styles.css": {
    code: `/* Modern Counter App Styles */
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.counter {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.counter button {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.counter button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.count {
  font-size: 3rem;
  font-weight: bold;
  min-width: 100px;
  text-align: center;
}`,
    hidden: false,
    readOnly: false,
  },
  "/utils.js": {
    code: `// Utility functions for the app
export function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}`,
    hidden: false,
  },
};

export default function FileManagerComponent() {
  const [files, setFiles] = useState<SandpackFiles>(initialFiles);
  const [showOutput, setShowOutput] = useState(false);

  const handleFilesChange = (newFiles: SandpackFiles) => {
    setFiles(newFiles);
  };

  return (
    <div className="container mx-auto space-y-4 p-4 py-16 sm:space-y-6 sm:p-6">
      <div className="space-y-2 text-center sm:pt-16">
        <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          File Manager Component
        </h1>
        <p className="text-muted-foreground px-4 text-sm sm:px-0 sm:text-base">
          Reusable file management components with Monaco editor for forms and
          applications
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="output" className="text-sm sm:text-base">
            Show JSON Output
          </Label>
          <Switch
            id="output"
            checked={showOutput}
            onCheckedChange={setShowOutput}
          />
        </div>
      </div>

      {/* File Manager Component */}
      <div className="w-full">
        <AdvancedFileManager
          initialFiles={files}
          onChange={handleFilesChange}
          showOutput={showOutput}
          showProperties={true}
          maxFiles={15}
        />
      </div>

      {/* Usage Information */}
      <div className="bg-muted/30 mx-auto space-y-4 rounded-lg border p-4 sm:p-6 mt-4">
        <h3 className="text-base font-semibold sm:text-lg">
          How to Use in Your Forms
        </h3>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="space-y-2">
            <h4 className="font-medium">Basic Usage:</h4>
            <pre className="bg-muted/60 block overflow-x-auto rounded p-2 text-xs sm:text-sm">
              {`<AdvancedFileManager initialFiles={files} onChange={handleFilesChange} />`}
            </pre>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">
              Advanced Usage with Additional Templates:
            </h4>
            <pre className="bg-muted/60 block overflow-x-auto rounded p-2 text-xs sm:text-sm">
              {`<AdvancedFileManager 
  initialFiles={files} 
  onChange={handleFilesChange}
  maxFiles={10}
  fileTemplates={{
    "Custom Template": "// Your custom template content",
  }}
  validateFileName={(name) => name.endsWith('.tsx') ? null : 'Must be .tsx file'}
/>`}
            </pre>
          </div>
        </div>
      </div>

      <div className="text-muted-foreground py-4 text-center text-xs sm:text-sm">
        Made with ❤️ by{" "}
        <a
          href="https://x.com/shivay1256"
          target="_blank"
          className="hover:text-foreground underline"
          rel="noreferrer"
        >
          Shiva Yadav
        </a>
      </div>
    </div>
  );
}
