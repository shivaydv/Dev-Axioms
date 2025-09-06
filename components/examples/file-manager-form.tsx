"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SandpackFiles } from "@codesandbox/sandpack-react";
import AdvancedFileManager from "../FileManager/AdvancedFileManager";

export default function FileManagerFormExample() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    files: {} as SandpackFiles,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    alert("Check console for form data including files JSON!");
  };

  const handleFilesChange = (files: SandpackFiles) => {
    setFormData((prev) => ({ ...prev, files }));
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Create New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Regular form fields */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="title">Project Title</Label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="bg-background text-foreground mt-1 w-full rounded-md border px-3 py-2"
              placeholder="My Awesome Project"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="bg-background text-foreground mt-1 w-full rounded-md border px-3 py-2"
              placeholder="A brief description..."
            />
          </div>
        </div>

        {/* File Manager Component */}
        <div>
          <Label className="text-base font-medium">Starter Files</Label>
          <p className="text-muted-foreground mb-3 text-sm">
            Set up your initial project structure and code
          </p>

          <AdvancedFileManager
            initialFiles={{
              "/index.js": {
                code: "console.log('Hello, World!');",
                active: true,
              },
            }}
            onChange={handleFilesChange}
            showProperties={true}
          />
        </div>

        {/* Submit button */}
        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1 sm:flex-none">
            Create Project
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setFormData({ title: "", description: "", files: {} })
            }
          >
            Reset Form
          </Button>
        </div>
      </form>

      {/* Display current form state */}
      <div className="bg-muted/50 mt-8 rounded-lg p-4">
        <h3 className="mb-2 font-medium">Current Form State:</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Title:</strong> {formData.title || "Not set"}
          </p>
          <p>
            <strong>Description:</strong> {formData.description || "Not set"}
          </p>
          <p>
            <strong>Files:</strong> {Object.keys(formData.files).length} files
          </p>
        </div>
      </div>
    </div>
  );
}
