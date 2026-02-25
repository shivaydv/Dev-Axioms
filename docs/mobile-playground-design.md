# Mobile Playground Design Specification

This document outlines the proposed design system and architectural patterns for the mobile version of the Dev Axioms practice playground.

## 1. Vision
The mobile playground should provide a "native-app-like" experience that allows users to read challenge details, edit code, and view results seamlessly on small screens without compromising the powerful features of the desktop environment.

## 2. Layout Architecture

### Core Structure
- **Container**: Use `h-[100dvh]` (Dynamic Viewport Height) to ensure the layout fills the visible area exactly, accounting for browser chrome (address bars).
- **Flex Column**: A three-part vertical stack:
    1. **Header**: Compact navigation and status.
    2. **Main Content**: `flex-1 overflow-hidden` area for the active tab.
    3. **Navigation**: Tab bar pinned to the bottom.

### Tab-Based Navigation
Instead of sidebars or split-panes, mobile uses a bottom navigation bar with three primary states:
1. **Details (`description`)**: 
   - Challenge title.
   - User interactions (Likes, Bookmarks).
   - Scrollable MDX content (Instructions & Solutions).
2. **Code (`code`)**:
   - Full-screen Monaco Editor.
   - File tabs for multi-file projects.
3. **Result (`preview`)**:
   - Live browser preview.
   - Draggable Console resizer.

## 3. Interaction Patterns

### Console Resizer (Preview Tab)
- **Problem**: Live previews and consoles both need significant space.
- **Solution**: A vertical drag handle allowing users to resize the console up to **40%** of the screen height. 
- **Implementation**: Use `onTouchStart` and `onTouchMove` listeners on a global level to handle resizing without lag.

### Navigation Hierarchy
- Use a `fixed` or `shrink-0` bottom bar.
- Use active state indicators (e.g., a top-border or background shift) to show the current tab.
- Implement micro-animations (`animate-in`, `fade-in`, `slide-in-from-right`) when switching tabs to improve perceived quality.

## 4. Technical Constraints

### Performance
- **Single Provider**: Keep `SandpackProvider` at the root of the layout to ensure state (code changes) persists even when the user switches tabs.
- **Hydration**: Default the `useResponsive` hook to a neutral state or `mobile` to avoid desktop-flicker on slow connections.
- **Touch Targets**: Ensure all buttons and handles are at least `44px` in height for reliable touch interaction.

## 5. Visual Guidelines
- **Glassmorphism**: Use `backdrop-blur-xl` on the header and bottom navigation for a premium feel.
- **Spacing**: Use `px-4` or `px-5` instead of the desktop `px-12` to maximize content width.
- **Safe Areas**: Use `pb-safe` (CSS environment variables) to ensure content isn't clipped by device "notches" or home indicators.
