# 🔍 Admin Panel — Deep Analysis & Optimization Roadmap

> **Scope**: Full audit of `app/admin/`, `components/admin-dashboard/`, `components/md-editor/`, `components/FileManager/`, `server/actions/`, and `server/functions/` — covering architecture, performance, editing experience, and code quality.

---

## Current State Summary

| Area | Status | Verdict |
|------|--------|---------|
| **Questions CRUD** | ✅ Working | Create, edit, delete with Prisma |
| **Auth guard** | ⚠️ Fragile | Per-page checks, no layout-level protection |
| **Dashboard home** | ❌ Placeholder | Literally `<div>Working on Dashboard</div>` |
| **Blog management** | ❌ Not started | Plan exists, zero implementation |
| **Markdown editor** | ✅ Functional | MDXEditor + Monaco + Preview tabs |
| **File manager** | ✅ Functional | Sandpack-based, multi-file support |
| **Performance** | ⚠️ Issues | Heavy client bundles, no pagination, duplicate queries |
| **Editing experience** | ⚠️ Decent | Works but has several DX friction points |

---

## 1. 🔐 Architecture & Auth — Critical Issues

### Problem: Auth Check Repetition (Fragile Security)

Every single admin page manually calls `getUserSession()` + `checkIsAdmin()` + `redirect("/")`. This is:
- **Error-prone**: Forget one check on a new page → security hole
- **Redundant**: Same 3 lines copy-pasted across 4+ pages
- **Slow**: `getUserSession()` hits the auth API on every page, even though the layout could do it once

```
app/admin/page.tsx           → getUserSession() + checkIsAdmin()
app/admin/questions/page.tsx → getUserSession() + checkIsAdmin()
app/admin/questions/add/page.tsx → getUserSession() + checkIsAdmin()
app/admin/questions/[id]/edit/page.tsx → getUserSession() + checkIsAdmin()
```

### ✅ Fix: Move auth to `app/admin/layout.tsx` (single gate)

```tsx
// app/admin/layout.tsx — ONE auth check for ALL admin routes
export default async function AdminLayout({ children }) {
  const session = await getUserSession();
  if (!checkIsAdmin(session)) redirect("/");
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>...</main>
    </SidebarProvider>
  );
}
```

Then **remove** the auth checks from every child page. Since `getUserSession` uses `cache()`, it deduplicates within a single request anyway — but calling it from layout means the redirect happens before any child page even renders.

> [!IMPORTANT]
> This is the **#1 priority fix**. It's both a security hardening and a performance improvement (avoid rendering child components before auth check).

### Problem: No Server Action Auth

[question-actions.ts](file:///home/shiva/Desktop/code/personal/Dev-Axioms/server/actions/question-actions.ts) has **zero auth checks**. Anyone who can POST to these server actions can create/update/delete questions.

```typescript
// Current — NO auth check
export async function addQuestion(data: QuestionFormData) {
  // Directly creates question — no session check!
  await prisma.question.create({ ... });
}
```

### ✅ Fix: Add auth guards to all server actions

```typescript
export async function addQuestion(data: QuestionFormData) {
  const session = await getUserSession();
  if (!checkIsAdmin(session)) {
    return { success: false, message: "Unauthorized" };
  }
  // ... rest of logic
}
```

---

## 2. 📊 Data Layer — Performance & Correctness

### Problem: No Pagination on `getAllQuestions()`

[questions.ts:L28-L35](file:///home/shiva/Desktop/code/personal/Dev-Axioms/server/functions/questions.ts#L28-L35) does `prisma.question.findMany()` with **no limit, no pagination, no ordering**.

With 10 questions this is fine. With 500? You're fetching all columns (including `content` which can be huge markdown blobs) for every question, serializing it all, and shipping it to the client.

### ✅ Fix: Paginated + selective fetching

```typescript
export async function getQuestionsForAdmin(page = 1, limit = 20) {
  const [questions, total] = await Promise.all([
    prisma.question.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, title: true, slug: true, difficulty: true,
        tags: true, timeLimit: true, createdAt: true,
        // NO content, NO starterCode, NO solution — not needed for list view
      },
    }),
    prisma.question.count(),
  ]);
  return { questions, total, pages: Math.ceil(total / limit) };
}
```

### Problem: Duplicate Query in Edit Page

[edit/page.tsx](file:///home/shiva/Desktop/code/personal/Dev-Axioms/app/admin/questions/%5Bid%5D/edit/page.tsx#L14-L24) defines its own `getQuestion()` function instead of using the cached `getQuestionById()` from `server/functions/questions.ts`.

```typescript
// In edit/page.tsx — local function, NOT cached
async function getQuestion(id: string) {
  const questionData = await prisma.question.findUnique({ where: { id } });
  return questionData ?? null;
}

// In server/functions/questions.ts — CACHED with React.cache
export const getQuestionById = cache(async (questionId: string) => {
  // Same query!
});
```

### ✅ Fix: Use the shared cached function

```typescript
import { getQuestionById } from "@/server/functions/questions";
// Remove the local getQuestion function
const questionData = await getQuestionById(id);
```

### Problem: Slug Collision Risk

[question-actions.ts](file:///home/shiva/Desktop/code/personal/Dev-Axioms/server/actions/question-actions.ts#L10) generates slugs but doesn't check for uniqueness before create. If two questions have similar titles → DB unique constraint error with a bad error message.

### ✅ Fix: Add slug uniqueness check + auto-suffix

```typescript
async function generateUniqueSlug(title: string, excludeId?: string) {
  let slug = generateSlug(title);
  let suffix = 0;
  while (true) {
    const candidate = suffix ? `${slug}-${suffix}` : slug;
    const existing = await prisma.question.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    suffix++;
  }
}
```

---

## 3. ✍️ Editing Experience — The Biggest Opportunity

### Problem: MDXEditor has a debug background color

[MDXEditorTab.tsx:L51](file:///home/shiva/Desktop/code/personal/Dev-Axioms/components/md-editor/MDXEditorTab.tsx#L51) — the TabsContent has `bg-red-300` which is clearly leftover debug styling:

```tsx
className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-red-300 pt-0!"
//                                                          ^^^^^^^^^^
```

### ✅ Fix: Remove `bg-red-300`

### Problem: RawEditorTab Uses `defaultValue` (Stale State)

[RawEditorTab.tsx](file:///home/shiva/Desktop/code/personal/Dev-Axioms/components/md-editor/RawEditorTab.tsx#L21) uses `defaultValue={markdown}` for Monaco. This means if you edit in the MDX tab, switch to Raw tab → **it still shows the OLD content**. `defaultValue` only sets the initial value and doesn't respond to prop changes.

### ✅ Fix: Use `value` prop + control updates

```tsx
<Editor
  value={markdown}          // ← controlled, syncs with parent state
  onChange={(value) => onChange(value || "")}
  // ... rest
/>
```

### Problem: No Auto-save / Draft Recovery

If you accidentally close the tab or navigate away mid-edit → **all content is lost**. No draft saving, no unsaved changes warning.

### ✅ Fix: Implement auto-save to localStorage

```typescript
// useAutosave hook
function useAutosave(key: string, value: string, delay = 2000) {
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(`draft:${key}`, value);
    }, delay);
    return () => clearTimeout(timer);
  }, [key, value, delay]);
  
  return {
    hasDraft: typeof window !== 'undefined' && !!localStorage.getItem(`draft:${key}`),
    restoreDraft: () => localStorage.getItem(`draft:${key}`) || '',
    clearDraft: () => localStorage.removeItem(`draft:${key}`),
  };
}
```

Plus add a `beforeunload` warning:
```typescript
useEffect(() => {
  const handler = (e: BeforeUnloadEvent) => {
    if (hasUnsavedChanges) e.preventDefault();
  };
  window.addEventListener('beforeunload', handler);
  return () => window.removeEventListener('beforeunload', handler);
}, [hasUnsavedChanges]);
```

### Problem: No Image Upload in Editor

[MDXEditorTab.tsx:L73-L75](file:///home/shiva/Desktop/code/personal/Dev-Axioms/components/md-editor/MDXEditorTab.tsx#L73-L75) — The image plugin has no upload handler configured:

```tsx
imagePlugin({
  // imageUploadHandler,  ← commented out!
}),
```

The toolbar has `<InsertImage />` but it can only insert URLs — no drag-and-drop or file upload.

### ✅ Fix: Add image upload handler (e.g., to Vercel Blob or S3)

### Problem: Add and Edit Forms Duplicate Code (~80%)

[add-question-form.tsx](file:///home/shiva/Desktop/code/personal/Dev-Axioms/components/admin-dashboard/add-question-form.tsx) (283 lines) and [edit-question-form.tsx](file:///home/shiva/Desktop/code/personal/Dev-Axioms/components/admin-dashboard/edit-question-form.tsx) (313 lines) are nearly identical. They share:
- Same Zod schema (copy-pasted)
- Same Section/LabelWithBadge components (copy-pasted) 
- Same form layout and fields
- Same tab structure

### ✅ Fix: Extract a shared `QuestionForm` component

```tsx
// components/admin-dashboard/question-form.tsx
export function QuestionForm({ 
  question, // null for create, existing for edit
  onSubmit,
  isLoading 
}) {
  // Single form component used by both add and edit
}
```

---

## 4. ⚡ Performance — Bundle & Runtime

### Problem: Heavy Client-Side Bundles

The admin forms load these **massive** client-side libraries simultaneously:
- `@mdxeditor/editor` (~300KB+ gzipped with CodeMirror)
- `@monaco-editor/react` (~1MB+ the Monaco editor core)
- `@codesandbox/sandpack-react` (Sandpack runtime)

This is 3 full code editors loaded for a single form page.

### Current Mitigation

MDXEditorTab is already `dynamic(() => import(...), { ssr: false })` ✅ — good.

### ✅ Further Optimizations

1. **Lazy-load tabs**: Only load the editor for the active tab. Currently ALL 3 tab contents (MDXEditor, Sandpack FileManager, Solution editor) mount simultaneously even though only one is visible.

```tsx
// Instead of mounting all tabs at once:
<TabsContent value="content">
  <Suspense fallback={<EditorSkeleton />}>
    {activeTab === 'content' && <MarkdownEditor ... />}
  </Suspense>
</TabsContent>
```

2. **Code-split Monaco**: The Raw editor tab loads Monaco which is ~1MB. Most users won't even click "Raw". It should be dynamically imported too.

3. **Code-split Sandpack/FileManager**: Same — only needed for the "Starter Code" tab.

### Problem: No `Suspense` Boundaries on Edit Page

The edit page loads question data server-side but the entire page is blocked until the DB query completes. Unlike the questions list page (which uses `<Suspense>` + `<LoadingTable />`), the edit page has no streaming.

### ✅ Fix: Add proper suspense + the existing loading.tsx will work

---

## 5. 🎨 UI/UX — Missing Pieces

### Problem: Empty Dashboard Page

[admin/page.tsx](file:///home/shiva/Desktop/code/personal/Dev-Axioms/app/admin/page.tsx#L11) shows `<div>Working on Dashboard</div>`.

### ✅ Fix: Build a real dashboard with stats

```tsx
// Quick-win: show key metrics
const [questionsCount, usersCount] = await Promise.all([
  prisma.question.count(),
  prisma.user.count(),
]);

// Render stat cards: Total Questions, Questions by Difficulty, 
// Recent Activity, Quick Actions
```

### Problem: No Keyboard Shortcuts

No `Ctrl+S` to save, no `Ctrl+Enter` to submit. The editor experience would feel much snappier with shortcuts.

### ✅ Fix: Add `useHotkeys` or native event listeners

```typescript
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };
  document.addEventListener('keydown', handler);
  return () => document.removeEventListener('keydown', handler);
}, []);
```

### Problem: No Breadcrumbs

When navigating to `/admin/questions/[id]/edit` → there's no visual breadcrumb trail. The back button is just a small ghost icon in the card header.

### Problem: No Success/Redirect Feedback After Actions

After creating a question, the user is redirected to `/admin/questions` with a toast. But there's no visual indicator of which question was just created/updated (like highlighting the new row).

---

## 6. 🧹 Code Quality Issues

| Issue | Location | Severity |
|-------|----------|----------|
| `bg-red-300` debug class left in production | [MDXEditorTab.tsx:L51](file:///home/shiva/Desktop/code/personal/Dev-Axioms/components/md-editor/MDXEditorTab.tsx#L51) | 🔴 High |
| Duplicated Zod schema across add/edit forms | Both form files | 🟡 Medium |
| Duplicated `Section`/`LabelWithBadge` components | Both form files | 🟡 Medium |
| `eslint-disable` for `any` type on starterCode | [question-actions.ts:L19-L20](file:///home/shiva/Desktop/code/personal/Dev-Axioms/server/actions/question-actions.ts#L19-L20) | 🟡 Medium |
| `any` type on `Question.starterCode` | [Question.ts:L8](file:///home/shiva/Desktop/code/personal/Dev-Axioms/types/Question.ts#L8) | 🟡 Medium |
| Edit form uses `useState` instead of `useTransition` | [edit-question-form.tsx:L46](file:///home/shiva/Desktop/code/personal/Dev-Axioms/components/admin-dashboard/edit-question-form.tsx#L46) | 🟢 Low |
| Unused import: `Package` from lucide-react | [sidebar.tsx:L2](file:///home/shiva/Desktop/code/personal/Dev-Axioms/components/admin-dashboard/sidebar.tsx#L2) | 🟢 Low |
| Missing `loading.tsx` for `questions/add` route | [add/](file:///home/shiva/Desktop/code/personal/Dev-Axioms/app/admin/questions/add/) | 🟢 Low |
| `defaultValue` vs `value` on Monaco (stale sync) | [RawEditorTab.tsx:L21](file:///home/shiva/Desktop/code/personal/Dev-Axioms/components/md-editor/RawEditorTab.tsx#L21) | 🟡 Medium |

---

## 7. 🔮 Future-Proofing (from your Dashboard Plan)

Your [admin_dashboard_plan.md](file:///home/shiva/Desktop/code/personal/Dev-Axioms/docs/admin_dashboard_plan.md) outlines a blog management system via DB + `@fumadocs/mdx-remote`. Before building that, I'd recommend fixing the foundation issues above first.

### Architecture Changes Needed Before Blog Admin

1. **Auth in layout** (fix #1) — So blog pages are automatically protected
2. **Shared form patterns** — So blog forms can reuse the same patterns
3. **Server action auth** — So blog CRUD APIs are secure
4. **Editor optimizations** — So the blog editor (which will reuse MarkdownEditor) performs well

---

## 📋 Prioritized Action Plan

### 🔴 Immediate (Do Now)
| # | Task | Impact | Effort |
|---|------|--------|--------|
| 1 | Remove `bg-red-300` from MDXEditorTab | Bug fix | 1 min |
| 2 | Move auth to `admin/layout.tsx` | Security + Perf | 15 min |
| 3 | Add auth guards to server actions | Security | 10 min |
| 4 | Fix `defaultValue` → `value` in RawEditorTab | Bug fix | 2 min |
| 5 | Use cached `getQuestionById` in edit page | Dedup | 5 min |

### 🟡 Short-term (This Week)
| # | Task | Impact | Effort |
|---|------|--------|--------|
| 6 | Extract shared `QuestionForm` component | DX/Maintainability | 1-2 hrs |
| 7 | Add pagination to questions list | Performance | 1 hr |
| 8 | Lazy-load editor tabs (only mount active tab) | Bundle perf | 30 min |
| 9 | Add `Ctrl+S` keyboard shortcut | UX | 15 min |
| 10 | Add auto-save drafts to localStorage | UX/Data safety | 1 hr |

### 🟢 Medium-term (This Sprint)
| # | Task | Impact | Effort |
|---|------|--------|--------|
| 11 | Build real dashboard page with stats | Completeness | 2-3 hrs |
| 12 | Add breadcrumbs to admin | Navigation UX | 30 min |
| 13 | Add slug uniqueness handling | Data integrity | 30 min |
| 14 | Add beforeunload warning for unsaved changes | Data safety | 15 min |
| 15 | Code-split Monaco + Sandpack | Bundle size | 1 hr |

### 🔵 When Building Blog Admin
| # | Task | Impact | Effort |
|---|------|--------|--------|
| 16 | Add `BlogPost` model to Prisma | DB schema | 30 min |
| 17 | Blog CRUD API routes | Backend | 2 hrs |
| 18 | Blog admin UI (reuse QuestionForm patterns) | Frontend | 3 hrs |
| 19 | Image upload handler for editor | Feature | 2 hrs |
| 20 | Search integration for DB blogs | Feature | 2 hrs |

---

> [!TIP]
> **Biggest bang-for-buck improvements**: Items 1-5 (immediate fixes) will take ~30 minutes total and address security holes, bugs, and redundancy. Item 6 (shared form) will cut ~300 lines of duplicated code and make the blog admin 3x faster to build later.

Want me to start implementing any of these? I'd recommend starting with the immediate fixes (items 1-5) as they're all quick and high-impact.
