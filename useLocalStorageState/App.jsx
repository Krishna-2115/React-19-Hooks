import { useLocalStorageState } from "./useLocalStorageState";
import { useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useLocalStorageState("darkMode", false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-4">Toggle Theme</h1>
          <p className="text-center mb-4">
            Current Theme: <strong>{darkMode ? "Dark" : "Light"}</strong>
          </p>
          <button
            onClick={toggleTheme}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
}
