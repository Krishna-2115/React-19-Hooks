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
