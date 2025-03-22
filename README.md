# 🚀 React 19 - File Upload & Form Management with Custom Hooks

This repository contains two modern React 19 projects:
1. **File Upload Component** using `useActionState` for async state management.
2. **Form Management System** using `useFormState` to streamline input handling.

Both projects leverage **React 19**, **Tailwind CSS**, and feature optimized state handling with hooks.

---

## 📂 Project 1: File Upload with `useActionState`

A modern **file upload component** built with a reusable `useActionState` hook to efficiently manage async operations, real-time progress, retries, and errors.

### ✨ Features
✅ **Drag & Drop + Click-to-Select** for easy file selection  
✅ **Real-time Progress Tracking** with smooth animations  
✅ **Optimistic UI Updates** using `useOptimistic` (React 19)  
✅ **Retry Failed Uploads** with automatic delay handling  
✅ **Auto-Reset Support** for seamless user experience  
✅ **Modern UI with Tailwind CSS & Lucide Icons**  

### 📦 Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/react19-projects.git
cd react19-projects
npm install
```

### 🚀 Usage
Import and use the component:
```jsx
import FileUploadExample from "./components/FileUploadExample";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <FileUploadExample />
    </div>
  );
}
export default App;
```

### `useActionState` Hook Implementation
```jsx
import { useState, useCallback } from "react";

function useActionState(action, { autoReset = false, retryLimit = 3, delayBetweenRetries = 2000 } = {}) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [output, setOutput] = useState(null);

  const execute = useCallback(async (...args) => {
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
  }, [action, autoReset]);

  return { status, error, progress, execute };
}
```

---

## 📂 Project 2: Form Management with `useFormState`

A **custom React 19 hook** designed for managing form state efficiently, reducing boilerplate code, and improving readability.

### ✨ Features
✅ **Minimal Boilerplate** - No need to handle `useState` manually for each field  
✅ **Dynamic Field Updates** - Updates multiple fields efficiently  
✅ **Reusable Hook** - Can be used across different forms  
✅ **Optimized for Controlled Components** - Works seamlessly with modern React features  

### 🚀 Usage
Create the `useFormState` hook in `useFormState.js`:
```jsx
import { useState } from "react";

export function useFormState(initialValues) {
  const [formState, setFormState] = useState(initialValues);

  const handleChange = (newValues) => {
    setFormState((prev) => ({ ...prev, ...newValues }));
  };

  return [formState, handleChange];
}
```

### Using `useFormState` in a Registration Form
```jsx
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
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={(e) => setFormState({ name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={(e) => setFormState({ email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={(e) => setFormState({ password: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Register
        </button>
      </form>
      {submitted && <p className="mt-4 text-green-500 text-center">Form submitted successfully!</p>}
    </div>
  );
}
```

---

## 📜 License
This project is **open-source** and available under the **MIT License**.

---

🔗 **Follow for more React & Web Development Projects!** 🚀

