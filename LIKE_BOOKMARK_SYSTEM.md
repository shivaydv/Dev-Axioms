# Like and Bookmark System Implementation

## Overview

This implementation adds a comprehensive like and bookmark system to the Dev-Axioms platform with the following features:

- **Optimistic UI Updates**: Instant feedback for user interactions
- **Production-Grade Performance**: Proper indexing, caching, and database optimizations
- **User Profile Pages**: Dedicated pages for liked and bookmarked questions
- **Real-time Interaction Counts**: Live updates of like counts
- **Responsive Design**: Mobile-friendly interface

## Features Implemented

### 1. Database Schema

**New Tables:**

- `question_like`: Stores user likes with composite unique constraints
- `question_bookmark`: Stores user bookmarks with composite unique constraints

**Key Features:**

- Composite unique constraints prevent duplicate interactions
- Proper foreign key relationships with cascade deletes
- Optimized indexes for performance
- Timestamps for interaction tracking

### 2. Server Actions

**User Interaction Actions** (`server/actions/user-interactions-actions.ts`):

- `toggleLike()`: Add/remove likes with optimistic updates
- `toggleBookmark()`: Add/remove bookmarks with optimistic updates
- `getUserInteractionData()`: Get user's interaction status and counts
- `getUserLikedQuestions()`: Retrieve user's liked questions
- `getUserBookmarkedQuestions()`: Retrieve user's bookmarked questions
- `getPopularQuestions()`: Get most liked questions

### 3. Custom Hooks

**useUserInteractions Hook** (`hooks/useUserInteractions.ts`):

- Optimistic UI updates for likes and bookmarks
- Automatic rollback on errors
- Toast notifications for user feedback
- Loading states management

### 4. UI Components

**Enhanced Sidebar** (`components/playground/Sidebar.tsx`):

- Interactive like and bookmark buttons
- Real-time count displays
- Visual feedback for user interactions
- Proper accessibility support

**Profile Pages**:

- `/profile` - Overview with statistics
- `/profile/liked` - User's liked questions
- `/profile/bookmarks` - User's bookmarked questions

**Utility Components**:

- `PopularQuestions` - Display most liked questions
- `EnhancedQuestionList` - Advanced question listing with filters

### 5. Performance Optimizations

- **Database Indexes**: Optimized queries with proper indexing
- **Parallel Queries**: Simultaneous data fetching where possible
- **Optimistic Updates**: Instant UI feedback before server confirmation
- **Efficient Caching**: Proper Next.js caching strategies
- **Component Memoization**: Prevent unnecessary re-renders

## API Endpoints

### Server Actions

```typescript
// Toggle like status
const result = await toggleLike(questionId: string)

// Toggle bookmark status
const result = await toggleBookmark(questionId: string)

// Get interaction data
const data = await getUserInteractionData(questionId: string)

// Get user's liked questions
const questions = await getUserLikedQuestions()

// Get user's bookmarked questions
const questions = await getUserBookmarkedQuestions()

// Get popular questions
const questions = await getPopularQuestions(limit?: number)
```

## Usage Examples

### Basic Like/Bookmark Implementation

```tsx
import { useUserInteractions } from "@/hooks/useUserInteractions";

function QuestionCard({ question }) {
  const { likesCount, isLiked, isBookmarked, handleLike, handleBookmark } =
    useUserInteractions({
      questionId: question.id,
      initialLikesCount: question.likesCount,
      initialIsLiked: question.isLiked,
      initialIsBookmarked: question.isBookmarked,
    });

  return (
    <div>
      <h3>{question.title}</h3>

      <button onClick={handleLike}>
        <Heart className={isLiked ? "fill-red-500" : ""} />
        {likesCount}
      </button>

      <button onClick={handleBookmark}>
        <Bookmark className={isBookmarked ? "fill-blue-500" : ""} />
      </button>
    </div>
  );
}
```

### Server-Side Data Fetching

```tsx
// In a Next.js page component
export default async function PracticePage({ params }) {
  const questionWithInteractions = await getQuestionWithInteractions(
    params.slug,
  );

  return (
    <ResponsivePracticeLayout
      question={questionWithInteractions}
      initialLikesCount={questionWithInteractions.likesCount}
      initialIsLiked={questionWithInteractions.isLiked}
      initialIsBookmarked={questionWithInteractions.isBookmarked}
    />
  );
}
```

## Security Considerations

1. **Authentication Required**: All interaction endpoints require user authentication
2. **Input Validation**: Proper validation of question IDs and user permissions
3. **Rate Limiting**: Consider implementing rate limiting for high-frequency actions
4. **SQL Injection Prevention**: Using Drizzle ORM with parameterized queries

## Performance Metrics

- **Database Queries**: Optimized with proper indexes and parallel execution
- **UI Response Time**: Optimistic updates provide instant feedback
- **Cache Strategy**: Leverages Next.js caching for improved performance
- **Bundle Size**: Minimal impact on bundle size with tree-shaking

## Future Enhancements

1. **Analytics Dashboard**: Track interaction metrics
2. **Recommendation System**: Suggest questions based on user interactions
3. **Social Features**: Share liked questions with other users
4. **Advanced Filtering**: Filter by interaction history
5. **Export Functionality**: Export liked/bookmarked questions

## Database Migration

The implementation includes database migrations to add the new tables:

```sql
-- Create question_like table
CREATE TABLE "question_like" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "question_id" uuid NOT NULL REFERENCES "question"("id") ON DELETE CASCADE,
  "created_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "user_question_like_unique" UNIQUE("user_id", "question_id")
);

-- Create question_bookmark table
CREATE TABLE "question_bookmark" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "question_id" uuid NOT NULL REFERENCES "question"("id") ON DELETE CASCADE,
  "created_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "user_question_bookmark_unique" UNIQUE("user_id", "question_id")
);

-- Add indexes for performance
CREATE INDEX "question_like_user_id_idx" ON "question_like"("user_id");
CREATE INDEX "question_like_question_id_idx" ON "question_like"("question_id");
CREATE INDEX "question_bookmark_user_id_idx" ON "question_bookmark"("user_id");
CREATE INDEX "question_bookmark_question_id_idx" ON "question_bookmark"("question_id");
```

## Testing

The implementation includes comprehensive error handling and fallback mechanisms:

- Optimistic updates with automatic rollback on failures
- Graceful degradation for unauthenticated users
- Toast notifications for user feedback
- Loading states for better UX

This system provides a robust, scalable foundation for user interactions while maintaining excellent performance and user experience.
