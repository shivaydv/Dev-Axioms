"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Github, Book } from "lucide-react";
import MarkdownEditor from "@/components/md-editor/MarkdownEditor";

const sampleMarkdown = `# Welcome to Advanced Markdown Editor

A **powerful and intuitive** markdown editor built with modern React components.

## ✨ Key Features

### Rich Text Editing
- **Bold**, *italic*, and ~~strikethrough~~ text
- \`Inline code\` with syntax highlighting
- [Clickable links](https://github.com/shivaydv/dev-axioms) that work seamlessly

### Code Blocks with Syntax Highlighting
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (userData: Omit<User, 'id'>): User => {
  return {
    id: Math.floor(Math.random() * 1000),
    ...userData
  };
};

const newUser = createUser({
  name: "John Doe",
  email: "john@example.com"
});
\`\`\`


\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("World"));
\`\`\`

### Tables Made Easy
| Feature | Status | Description |
|---------|---------|-------------|
| Live Preview | ✅ | Real-time markdown rendering |
| Image Upload | ✅ | Drag & drop support |
| Export Options | ✅ | Multiple format support |
| Collaborative | 🚧 | Coming soon |

### Lists and Organization
1. **Numbered lists** for step-by-step guides
2. **Bullet points** for quick notes
3. **Nested items** for complex structures
   - Sub-item one
   - Sub-item two
   - Sub-item three

### Blockquotes for Emphasis
> "The best markdown editor I've ever used. It combines the simplicity of plain text with the power of rich formatting."
> 
> — **Happy Developer**

### Images and Media
![Sample Image](https://images.pexels.com/photos/707837/pexels-photo-707837.jpeg)

---

## 🚀 Try It Yourself!

Switch between the **Edit**, **Preview**, and **Raw** modes to experience the full power of this editor. Perfect for documentation, blogs, README files, and more!`;

export default function MarkdownEditorLandingPage() {
  const [markdown, setMarkdown] = useState(sampleMarkdown);

  return (
    <div className="container mx-auto space-y-8 p-4 py-16 sm:space-y-12 sm:p-6">
      {/* Hero Section */}
      <div className="space-y-4 text-center sm:pt-16">
        <div className="flex justify-center">
          <Badge variant="secondary" className="mb-4 px-3 py-1">
            v1.0 - Now Available
          </Badge>
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-6xl">
          Advanced Markdown Editor
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl px-4 text-base sm:px-0 sm:text-lg lg:text-xl">
          A powerful, feature-rich markdown editor with live preview, syntax
          highlighting, and intuitive editing tools. Perfect for developers,
          writers, and content creators.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <Button size="lg" className="w-full sm:w-auto">
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <Book className="mr-2 h-4 w-4" />
            Documentation
          </Button>
        </div>
      </div>

      {/* Editor Demo */}
      <div className="w-full">
        <div className="mb-4 text-center">
          <h2 className="mb-2 text-2xl font-semibold">Try It Live</h2>
          <p className="text-muted-foreground">
            Edit the content below and see the magic happen in real-time
          </p>
        </div>

        <MarkdownEditor
          markdown={markdown}
          onChange={setMarkdown}
          className="mx-auto max-w-6xl"
        />
      </div>

      {/* Usage Information */}
      <div className="bg-muted/30 mx-auto max-w-4xl space-y-6 rounded-lg border p-6 sm:p-8">
        <div className="text-center">
          <h3 className="mb-2 text-xl font-semibold sm:text-2xl">
            Quick Start Guide
          </h3>
          <p className="text-muted-foreground">
            Get started with the markdown editor in your React project
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base">
          <div className="space-y-3">
            <h4 className="text-base font-semibold">1. Installation:</h4>
            <pre className="bg-muted/60 overflow-x-auto rounded-lg p-4 text-sm">
              <code>{`npm install @mdxeditor/editor @monaco-editor/react`}</code>
            </pre>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-semibold">2. Usage:</h4>
            <pre className="bg-muted/60 overflow-x-auto rounded-lg p-4 text-sm">
              <code>{`import { MarkdownEditor } from "@/components/md-editor";

function MyComponent() {
  const [content, setContent] = useState("# Hello World");
  
  return (
    <MarkdownEditor
      markdown={content}
      onChange={setContent}
      editorRef={editorRef}
      className="my-custom-class"
    />
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-muted-foreground border-t py-8 text-center text-sm sm:text-base">
        <p>
          Made by{" "}
          <a
            href="https://x.com/shivay1256"
            target="_blank"
            className="hover:text-foreground font-medium underline"
            rel="noreferrer"
          >
            Shiva Yadav
          </a>
        </p>
      </div>
    </div>
  );
}
