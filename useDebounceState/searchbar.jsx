import { useDebouncedState } from "./useDebouncedState";
import { useEffect, useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useDebouncedState("", 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      // Simulating API search
      console.log("Fetching results for:", searchQuery);
      setResults([`Result for "${searchQuery}"`, "More results..."]);
    }
  }, [searchQuery]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">🔍 Debounced Search</h2>
      <input
        type="text"
        placeholder="Type to search..."
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <div className="mt-4">
          <h3 className="text-gray-600">Search Results:</h3>
          <ul className="list-disc pl-4 text-gray-800">
            {results.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
