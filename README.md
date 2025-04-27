** 🚀 React-19-Hooks

This repository contains five modern React 19 projects with optimized state management using hooks:

File Upload Component — Using useActionState for async state management.

Form Management System — Using useFormState for streamlined input handling.

Debounced State Hook — Using useDebouncedState for performance optimization in search inputs or API calls.

Local Storage State Hook — Using useLocalStorageState for persistent state management with localStorage.

Previous State Hook — Using usePreviousState to track previous values easily.

All projects leverage React 19, Tailwind CSS, and optimized state management using hooks.

📂 Project 1: File Upload with useActionState
A modern file upload component built with a reusable useActionState hook to efficiently manage async operations, real-time progress, retries, and errors.

✨ Features

✅ Drag & Drop + Click-to-Select for easy file selection

✅ Real-time Progress Tracking with smooth animations

✅ Optimistic UI Updates using useOptimistic (React 19)

✅ Retry Failed Uploads with automatic delay handling

✅ Auto-Reset Support for seamless user experience

✅ Modern UI with Tailwind CSS & Lucide Icons

📦 Installation

bash
Copy
Edit
git clone https://github.com/your-username/react19-projects.git
cd react19-projects
npm install
🚀 Usage

jsx
Copy
Edit
import FileUploadExample from "./components/FileUploadExample";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <FileUploadExample />
    </div>
  );
}
export default App;
🔧 useActionState Hook Implementation

javascript
Copy
Edit
import { useState, useCallback } from "react";

function useActionState(action, { autoReset = false, retryLimit = 3, delayBetweenRetries = 2000 } = {}) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [output, setOutput] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setStatus("loading");
      setError(null);
      setProgress(0);
      setAttempts(0);
      setOutput(null);

      try {
        const result = await action(...args, setProgress);
        setStatus("success");
        setOutput(result);
        if (autoReset) setTimeout(() => setStatus("idle"), 2000);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setStatus("error");
      }
    },
    [action, autoReset]
  );

  return { status, error, progress, execute };
}
📂 Project 2: Form Management with useFormState
A custom React 19 hook designed for managing form state efficiently, reducing boilerplate code, and improving readability.

✨ Features

✅ Minimal Boilerplate - No need to handle useState manually for each field

✅ Dynamic Field Updates - Updates multiple fields efficiently

✅ Reusable Hook - Can be used across different forms

✅ Optimized for Controlled Components - Works seamlessly with modern React features

🚀 Hook Implementation

javascript
Copy
Edit
import { useState } from "react";

export function useFormState(initialValues) {
  const [formState, setFormState] = useState(initialValues);

  const handleChange = (newValues) => {
    setFormState((prev) => ({ ...prev, ...newValues }));
  };

  return [formState, handleChange];
}
🚀 Usage in a Registration Form

javascript
Copy
Edit
import { useFormState } from "./useFormState";
import { useState } from "react";

const initialState = { name: "", email: "", password: "" };

export default function RegistrationForm() {
  const [formState, setFormState] = useFormState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formState);
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Form Contents */}
    </div>
  );
}
📂 Project 3: Debounced State Hook (useDebouncedState)
A custom React 19 hook that introduces a debounced state update mechanism to improve performance.

✨ Features

✅ Eliminates Unnecessary Renders

✅ Ideal for Search Inputs & API Calls

✅ Adjustable Delay

✅ Optimized for Performance

🚀 Hook Implementation

javascript
Copy
Edit
import { useState, useEffect } from "react";

/**
 * Custom hook to debounce state updates.
 */
export function useDebouncedState(initialValue, delay = 500) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return [debouncedValue, setValue];
}
📂 Project 4: Local Storage State Hook (useLocalStorageState)
A custom React 19 hook to sync state with localStorage, ensuring persistence across reloads.

✨ Features

✅ Persistent State

✅ Customizable Key

✅ Auto Sync

🚀 Hook Implementation

javascript
Copy
Edit
import { useState, useEffect } from "react";

/**
 * Custom hook to manage state with localStorage.
 */
export function useLocalStorageState(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage value:", error);
    }
  };

  return [storedValue, setValue];
}
📂 Project 5: Previous State Hook (usePreviousState)
A lightweight React 19 hook that tracks the previous value of a state.

✨ Features

✅ Easy Tracking of Previous State

✅ Works with Any Type (String, Object, Array, Number)

✅ Lightweight and Fast

✅ Useful for Comparisons or Side Effects

🚀 Hook Implementation

javascript
Copy
Edit
import { useRef, useEffect } from "react";

/**
 * Custom hook to track previous state.
 * @param {any} value - The current value to track.
 * @returns {any} - The previous value.
 */
export function usePreviousState(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
🚀 Usage Example

javascript
Copy
Edit
import { useState } from "react";
import { usePreviousState } from "./usePreviousState";

export default function CounterExample() {
  const [count, setCount] = useState(0);
  const previousCount = usePreviousState(count);

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-2xl font-bold">Current: {count}</h1>
      <h2 className="text-gray-500">Previous: {previousCount ?? "N/A"}</h2>
      <button
        onClick={() => setCount((prev) => prev + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
}
📜 License
This project is open-source and available under the MIT License.

🔗 Follow for more React & Web Development Projects! 🚀