# App Performance Report

## Build Output Overview
```
├ ○ /playground                                197 B         256 kB
├ ○ /practice                                5.84 kB         124 kB
├ ƒ /practice/[slug]                         6.73 kB         263 kB
```

### Key Observations
1. `/playground`  
   - Very small page size (197 B) but **large JS bundle (256 kB)**.  
   - Indicates heavy client-side dependencies (e.g., Monaco editor, Shiki).  

2. `/practice`  
   - Page size: **5.84 kB** (lightweight).  
   - Bundle size: **124 kB**, relatively okay, but can be optimized.  

3. `/practice/[slug]`  
   - Dynamic route, size: **6.73 kB**.  
   - Bundle: **263 kB**, the heaviest due to dynamic imports and dependencies.  

---

## Performance Fixes

### 1. Code Splitting
- Use **dynamic imports** for heavy components (`Monaco Editor`, `Shiki`, `Sandpack`).  
- Example:
  ```tsx
  const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });
  ```

### 2. Tree Shaking
- Remove unused imports and ensure `next.config.js` is in production mode.  
- Verify third-party packages don’t bring in unnecessary polyfills.

### 3. Optimize Syntax Highlighting
- Shiki is heavy. Consider:  
  - Pre-highlighting on the server (during build) → send plain HTML + CSS.  
  - Or use lighter client-side libraries when interactivity isn’t needed.

### 4. Bundle Analysis
- Run:
  ```bash
  npm run build
  npm run analyze
  ```
- This shows which packages increase `/playground` and `/practice/[slug]` size.  
- Likely candidates: Monaco, Sandpack, Shiki.

### 5. Reduce Re-renders
- Memoize editors and previews (`React.memo`, `useMemo`).  
- Heavy editors should mount once and re-use state.  

---

## Suggested Next Steps
1. Run **Next.js bundle analyzer** and confirm heavy dependencies.  
2. Apply **dynamic imports** for Monaco/Shiki.  
3. Experiment with **server-side highlighting** for static pages.  
4. Compare load time before & after optimizations.  

---

## Iframe-based Previews (Tailwind / Monaco Isolation)

**Why:**  
- Prevents CSS bleed from Tailwind or global styles into the previewed components.  
- Keeps Monaco/Shiki syntax highlighting stable without runtime crashes.  
- Allows "obfuscation" of Tailwind classes like Tailwind UI Pro by isolating styles inside the iframe.  

**Performance Impact:**  
- Slight increase in memory usage per iframe (due to separate document context).  
- Initial load might be a bit slower, but once mounted, isolated previews improve long-term stability.  
- Lazy-loading iframes (render only when visible) avoids unnecessary resource usage.  

**Best Practices:**  
1. Use `loading="lazy"` on iframes to defer rendering until in viewport.  
2. Apply `sandbox` attributes (e.g., `sandbox="allow-scripts allow-same-origin"`) for security.  
3. Serve a minimal HTML document in the iframe that loads only the required styles and scripts.  
4. For Monaco editors inside iframes, initialize the theme once per iframe to avoid "theme not found" errors.  

**Conclusion:**  
Using iframe previews is the safest way to isolate playground components, prevent crashes, and mimic production environments with minimal leakage between styles or scripts.



```jsx
// app/playground/page.tsx
"use client";

import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });
const SandpackPreview = dynamic(
  () => import("@codesandbox/sandpack-react").then(m => m.SandpackPreview),
  { ssr: false }
);

export default function PlaygroundPage({ searchParams }) {
  const { slug } = searchParams;

  return (
    <div className="h-screen w-full flex">
      <MonacoEditor height="100%" defaultLanguage="javascript" />
      <SandpackPreview template="react" />
    </div>
  );
}
```

```jsx
// components/practice/PreviewFrame.tsx
"use client";

import { useEffect, useRef } from "react";

export default function PreviewFrame({ slug }: { slug: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = `/playground?slug=${slug}`;
    }
  }, [slug]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-[500px] rounded-xl border"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
```

```jsx
// components/practice/PreviewLoader.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const PreviewFrame = dynamic(() => import("./PreviewFrame"), { ssr: false });

export default function PreviewLoader({ slug }: { slug: string }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-6">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Open Playground
        </button>
      ) : (
        <PreviewFrame slug={slug} />
      )}
    </div>
  );
}

```

```jsx
// app/practice/[slug]/page.tsx
import Content from "@/components/practice/Content"; // Server Component
import PreviewLoader from "@/components/practice/PreviewLoader"; // Client trigger

export default async function PracticePage({ params }) {
  const data = await getPracticeData(params.slug);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Content data={data} /> 

      {/* Preview only loads when user wants */}
      <PreviewLoader slug={params.slug} />
    </div>
  );
}

```