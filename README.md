# useFormState Hook in React 19

## 📌 Overview  
The `useFormState` hook is a custom React 19 hook designed for managing form state in a more structured and reusable way. It simplifies handling form inputs by reducing boilerplate code and improving readability.

---

## 🚀 Installation  
Ensure you have React 19 installed in your project:

```
npm install react@19
📦 Hook Usage
📌 1. Create the useFormState Hook
Create a new file useFormState.js and add the following:

import { useState } from "react";

/**
 * useFormState - Custom React Hook for managing form state
 * @param {Object} initialValues - The initial state object of the form
 * @returns {[Object, Function]} - Returns the form state and a setter function
 */
export function useFormState(initialValues) {
  const [formState, setFormState] = useState(initialValues);

  // Function to update form fields dynamically
  const handleChange = (newValues) => {
    setFormState((prev) => ({ ...prev, ...newValues }));
  };

  return [formState, handleChange];
}
📌 2. Using useFormState in a Registration Form
Now, use this hook inside your RegistrationForm.js component:


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
🎯 Key Features of useFormState
✅ Minimal boilerplate – No need to handle useState manually for each field
✅ Dynamic field updates – Updates multiple fields efficiently
✅ Reusable – Can be used in different forms across the app

📌 Advantages of Using useFormState in React 19
🔹 Simplifies form state management
🔹 Enhances readability & maintainability
🔹 Optimized for controlled components
🔹 Works seamlessly with modern React features

📜 License
This project is licensed under the MIT License.

💡 Need Help?
If you have any questions or issues, feel free to reach out! 🚀
Happy Coding! 🎉