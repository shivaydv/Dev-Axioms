import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { question } from "./schema/questions-schema";
import { eq } from "drizzle-orm";

const client = neon(process.env.DATABASE_URL!);
const db = drizzle({ client });

const questionsToSeed = [
  {
    title: "Counter with Increment/Decrement",
    slug: "counter-with-increment-decrement",
    difficulty: "Easy" as const,
    tags: ["React", "useState"],
    timeLimit: 15,
    content: `
### Problem Statement
Create a counter application with an initial value of 0. 
Include two buttons: "Increment" and "Decrement". 
Clicking the buttons should reliably update the displayed count.

### Concepts Tested
- Basic \`useState\` usage.
- \`onClick\` event handlers.
    `.trim(),
    starterCode: {
      "/App.js": {
        code: `import React, { useState } from 'react';

export default function Counter() {
  return (
    <div>
      <h2>Counter: 0</h2>
      <button>Increment</button>
      <button>Decrement</button>
    </div>
  );
}`,
      },
    },
    solution: `
\`\`\`jsx
import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
\`\`\`
    `.trim(),
  },
  {
    title: "Show/Hide Text (Toggle)",
    slug: "show-hide-text-toggle",
    difficulty: "Easy" as const,
    tags: ["React", "useState", "Conditional Rendering"],
    timeLimit: 15,
    content: `
### Problem Statement
Create a button that initially says "Show text". 
Below it, there should be a paragraph of text that is completely hidden. 
Clicking the button should toggle the paragraph's visibility and update the button's label to "Hide text" when the paragraph is visible.

### Concepts Tested
- Boolean state (\`true\`/\`false\`).
- Conditional rendering (\`&&\` or ternary operators).
    `.trim(),
    starterCode: {
      "/App.js": {
        code: `import React, { useState } from 'react';

export default function ToggleText() {
  return (
    <div>
      <button>Show Text</button>
      {/* Add your paragraph here */}
    </div>
  );
}`,
      },
    },
    solution: `
\`\`\`jsx
import React, { useState } from 'react';

export default function ToggleText() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide text' : 'Show text'}
      </button>
      {isVisible && <p>This is the toggled text paragraph!</p>}
    </div>
  );
}
\`\`\`
    `.trim(),
  },
  {
    title: "Real-Time Text Mirror",
    slug: "real-time-text-mirror",
    difficulty: "Easy" as const,
    tags: ["React", "useState", "Forms"],
    timeLimit: 15,
    content: `
### Problem Statement
Create a text input field. 
Below the input field, display an \`<h3>\` heading that instantly updates to show exactly what the user is typing in real-time.

### Concepts Tested
- Controlled components.
- \`onChange\` event handling.
- Reading \`e.target.value\`.
    `.trim(),
    starterCode: {
      "/App.js": {
        code: `import React, { useState } from 'react';

export default function TextMirror() {
  return (
    <div>
      <input type="text" placeholder="Type here..." />
      <h3>{/* Display text here */}</h3>
    </div>
  );
}`,
      },
    },
    solution: `
\`\`\`jsx
import React, { useState } from 'react';

export default function TextMirror() {
  const [text, setText] = useState('');

  return (
    <div>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type here..." 
      />
      <h3>{text}</h3>
    </div>
  );
}
\`\`\`
    `.trim(),
  },
  {
    title: "Character Counter with Limit",
    slug: "character-counter-with-limit",
    difficulty: "Medium" as const,
    tags: ["React", "useState", "Styling"],
    timeLimit: 20,
    content: `
### Problem Statement
Build a \`<textarea>\`. 
Below it, display the current character count (e.g., "Characters: 15"). 
If the count exceeds 100 characters, turn the counter text red. Otherwise, keep it the default color.

### Concepts Tested
- String length calculations.
- Dynamic inline styling or dynamic CSS class names based on state conditions.
    `.trim(),
    starterCode: {
      "/App.js": {
        code: `import React, { useState } from 'react';

export default function CharacterCounter() {
  return (
    <div>
      <textarea placeholder="Type something..." />
      <p>Characters: 0</p>
    </div>
  );
}`,
      },
    },
    solution: `
\`\`\`jsx
import React, { useState } from 'react';

export default function CharacterCounter() {
  const [text, setText] = useState('');
  const count = text.length;
  const isOverLimit = count > 100;

  return (
    <div>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type something..." 
      />
      <p style={{ color: isOverLimit ? 'red' : 'black' }}>
        Characters: {count}
      </p>
    </div>
  );
}
\`\`\`
    `.trim(),
  },
  {
    title: "Disable Button on Empty Input",
    slug: "disable-button-on-empty-input",
    difficulty: "Medium" as const,
    tags: ["React", "useState", "Form Validation"],
    timeLimit: 20,
    content: `
### Problem Statement
Create a password input field and a "Submit" button. 
The Submit button must remain completely disabled (uncallable) until the user has typed at least 6 characters into the password field.

### Concepts Tested
- Derived state.
- The \`disabled\` HTML attribute.
- Basic form validation logic.
    `.trim(),
    starterCode: {
      "/App.js": {
        code: `import React, { useState } from 'react';

export default function PasswordForm() {
  return (
    <div>
      <input type="password" placeholder="Password" />
      <button>Submit</button>
    </div>
  );
}`,
      },
    },
    solution: `
\`\`\`jsx
import React, { useState } from 'react';

export default function PasswordForm() {
  const [password, setPassword] = useState('');
  const isButtonDisabled = password.length < 6;

  return (
    <div>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button disabled={isButtonDisabled}>Submit</button>
    </div>
  );
}
\`\`\`
    `.trim(),
  },
  {
    title: "Simple Static List Filter",
    slug: "simple-static-list-filter",
    difficulty: "Medium" as const,
    tags: ["React", "useState", "Lists", "Filter"],
    timeLimit: 25,
    content: `
### Problem Statement
Hardcode an array of 10 strings (like a list of fruits or cities). 
Create a search input field. 
As the user types, filter the displayed list below to only show items that include the search text (case-insensitive).

### Concepts Tested
- \`Array.prototype.filter()\`
- \`Array.prototype.map()\`
- Rendering lists with \`key\` props.
    `.trim(),
    starterCode: {
      "/App.js": {
        code: `import React, { useState } from 'react';

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'];

export default function ListFilter() {
  return (
    <div>
      <input type="text" placeholder="Search..." />
      <ul>
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}`,
      },
    },
    solution: `
\`\`\`jsx
import React, { useState } from 'react';

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'];

export default function ListFilter() {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..." 
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`
    `.trim(),
  },
  {
    title: "Todo List",
    slug: "todo-list-hard",
    difficulty: "Hard" as const,
    tags: ["React", "useState", "Forms", "Lists"],
    timeLimit: 25,
    content: `
### Problem Statement
Create a fully functional Todo List. It should allow the user to:
1. Type a task into an input field and click "Add" to append it to the list.
2. Click a "Delete" button next to any task to remove it.
3. Click on the task text itself to toggle its completion status (e.g., cross it out with a strikethrough).

### Concepts Tested
- Adding items to an array in state.
- Filtering arrays to remove items.
- Updating specific objects in an array (toggling a boolean property).
    `.trim(),
    starterCode: {
      "/App.js": {
        code: `import React, { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    // Add logic
  };

  return (
    <div>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Add a task..." 
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {/* Render todos here */}
      </ul>
    </div>
  );
}`,
      },
    },
    solution: `
\`\`\`jsx
import React, { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Add a task..." 
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <span 
              onClick={() => toggleTodo(todo.id)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`
    `.trim(),
  },
  {
    title: "Tabs Component (Conditional Rendering)",
    slug: "tabs-conditional-rendering",
    difficulty: "Hard" as const,
    tags: ["React", "useState", "Conditional Rendering"],
    timeLimit: 20,
    content: `
### Problem Statement
Create a Tabs component. There should be three buttons: "Tab 1", "Tab 2", and "Tab 3".
Below the buttons, display a string of text that changes completely based on which tab is currently active.
By default, Tab 1 should be active.

### Concepts Tested
- Storing the "active UI state" as a string or index.
- Conditionally rendering elements based on the current state.
    `.trim(),
    starterCode: {
      "/App.js": {
        code: `import React, { useState } from 'react';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button>Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        {/* Render active content here */}
      </div>
    </div>
  );
}`,
      },
    },
    solution: `
\`\`\`jsx
import React, { useState } from 'react';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setActiveTab(1)} style={{ fontWeight: activeTab === 1 ? 'bold' : 'normal' }}>Tab 1</button>
        <button onClick={() => setActiveTab(2)} style={{ fontWeight: activeTab === 2 ? 'bold' : 'normal' }}>Tab 2</button>
        <button onClick={() => setActiveTab(3)} style={{ fontWeight: activeTab === 3 ? 'bold' : 'normal' }}>Tab 3</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        {activeTab === 1 && <p>Content for Tab 1: Welcome to the first tab!</p>}
        {activeTab === 2 && <p>Content for Tab 2: Here is some totally different content.</p>}
        {activeTab === 3 && <p>Content for Tab 3: You have reached the final tab.</p>}
      </div>
    </div>
  );
}
\`\`\`
    `.trim(),
  },
  {
    title: "Generic Pagination Interface",
    slug: "generic-pagination-interface",
    difficulty: "Hard" as const,
    tags: ["React", "useState", "Pagination", "Logic"],
    timeLimit: 30,
    content: `
### Problem Statement
You are given a hardcoded array of 50 items (e.g., "Item 1" through "Item 50").
Build a UI that displays exactly 10 items per page.

You must build the pagination controls:
- A "Previous" button (disabled on the first page).
- A "Next" button (disabled on the last page).
- Display the current page number safely (e.g., "Page 1 of 5").

### Concepts Tested
- Array slicing (\`Array.prototype.slice()\`).
- Derived state calculations (total pages, starting index).
- Handling boundary conditions natively in React UI.
    `.trim(),
    starterCode: {
      "/App.js": {
        code: `import React, { useState } from 'react';

const mockData = Array.from({ length: 50 }, (_, i) => \`Item \${i + 1}\`);
const ITEMS_PER_PAGE = 10;

export default function Pagination() {
  // Implement pagination logic here

  return (
    <div>
      <ul>
        {/* Render items for current page here */}
      </ul>
      <div>
        <button>Previous</button>
        <span>Page X of Y</span>
        <button>Next</button>
      </div>
    </div>
  );
}`,
      },
    },
    solution: `
\`\`\`jsx
import React, { useState } from 'react';

const mockData = Array.from({ length: 50 }, (_, i) => \`Item \${i + 1}\`);
const ITEMS_PER_PAGE = 10;

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = mockData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <ul>
        {currentItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div>
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
\`\`\`
    `.trim(),
  },
  {
    title: "Simple Debounced Search",
    slug: "simple-debounced-search",
    difficulty: "Hard" as const,
    tags: ["React", "useEffect", "Forms"],
    timeLimit: 15,
    content: `
### Problem Statement
Create an input field. Below it, display the text from the input, but it should only render the text **1 second after the user stops typing**. 
If they keep typing before 1 second passes, the timer should reset.

### Concepts Tested
- \`useEffect\` dependencies.
- \`setTimeout\` and cleanup functions via \`clearTimeout\`.
    `.trim(),
    starterCode: {
      "/App.js": {
        code: `import React, { useState } from 'react';

export default function DebounceSearch() {
  const [text, setText] = useState("");
  const [debounced, setDebounced] = useState("");

  // Add a useEffect to debounce the text
  
  return (
    <div>
      <input 
        placeholder="Type here..." 
        value={text} 
        onChange={e => setText(e.target.value)} 
      />
      <p>Debounced Text: {debounced}</p>
    </div>
  );
}`,
      },
    },
    solution: `
\`\`\`jsx
import React, { useState, useEffect } from 'react';

export default function DebounceSearch() {
  const [text, setText] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounced(text);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [text]);

  return (
    <div>
      <input 
        placeholder="Type here..." 
        value={text} 
        onChange={e => setText(e.target.value)} 
      />
      <p>Debounced Text: {debounced}</p>
    </div>
  );
}
\`\`\`
    `.trim(),
  }
];

async function seed() {
  console.log("Starting seed process...");

  for (const q of questionsToSeed) {
    try {
      console.log(`Upserting question: ${q.title}...`);
      
      const existing = await db.select().from(question).where(eq(question.slug, q.slug));
      
      if (existing.length > 0) {
        console.log(`\tSkipped ${q.slug} (Already exists)`);
      } else {
        await db.insert(question).values({
          title: q.title,
          slug: q.slug,
          difficulty: q.difficulty,
          tags: q.tags,
          content: q.content,
          starterCode: q.starterCode as any,
          solution: q.solution,
          timeLimit: q.timeLimit,
        });
        console.log(`\tInserted ${q.slug}`);
      }
    } catch (error) {
      console.error(`Failed to upsert ${q.title}: `, error);
    }
  }

  console.log("Seed process completed.");
  process.exit(0);
}

seed();
