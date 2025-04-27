// components/CounterWithPrevious.jsx
import { useState } from "react";
import { usePrevious } from "../hooks/usePrevious";

export default function CounterWithPrevious() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Counter Tracker</h2>

        <div className="text-6xl font-extrabold text-indigo-600 mb-4">{count}</div>

        <p className="text-gray-500 mb-6">
          {prevCount !== undefined ? `Previous: ${prevCount}` : "No previous value yet"}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCount((prev) => prev - 1)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Decrease
          </button>
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            Increase
          </button>
        </div>
      </div>
    </div>
  );
}
