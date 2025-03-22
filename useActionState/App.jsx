import { useState, useCallback, useRef } from "react";
import { CloudUpload, RefreshCcw, XCircle } from "lucide-react";

// Custom Hook: useActionState
function useActionState(action, { autoReset = false, retryLimit = 3, delayBetweenRetries = 2000 } = {}) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setStatus("loading");
      setError(null);
      setAttempts(0);
      setProgress(0);
      setOutput(null);

      try {
        const result = await action(...args, setProgress);
        setStatus("success");
        setOutput(result);
        if (autoReset) {
          setTimeout(() => setStatus("idle"), 2000);
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
        setStatus("error");
      }
    },
    [action, autoReset]
  );

  const retry = useCallback(
    (...args) => {
      if (attempts < retryLimit) {
        setTimeout(() => {
          setAttempts((prev) => prev + 1);
          execute(...args);
        }, delayBetweenRetries);
      }
    },
    [attempts, execute, retryLimit, delayBetweenRetries]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setAttempts(0);
    setProgress(0);
    setOutput(null);
  }, []);

  return { status, error, execute, retry, reset, attempts, progress, output };
}

// Simulated File Upload Function
function uploadFile(file, setProgress) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file selected"));

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        Math.random() > 0.2 ? resolve(`Upload Complete: ${file.name}`) : reject(new Error("Upload Failed"));
      }
    }, 500);
  });
}

// File Upload Component
export default function FileUploadExample() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { status, progress, error, execute, retry, reset, output } = useActionState(uploadFile, { retryLimit: 2 });

  // File Input Ref (for click trigger)
  const fileInputRef = useRef(null);

  const fullReset = () => {
    setSelectedFile(null);
    reset();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-800">
      <div className="w-full max-w-md p-6 bg-white bg-opacity-20 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 drop-shadow-xl">
        <h2 className="text-xl font-semibold text-center text-white">File Upload</h2>

        {/* Drag & Drop Area (Click to Select) */}
        <div
          onClick={() => fileInputRef.current.click()} // Trigger file input
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition bg-white bg-opacity-10"
        >
          <CloudUpload className="w-10 h-10 text-white mb-2" />
          <p className="text-gray-600 text-sm">Drag & drop a file here, or <span className="text-blue-500 underline">click to select</span></p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* File Details */}
        {selectedFile && (
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mt-4">
            <div>
              <p className="text-gray-700 font-medium">{selectedFile.name}</p>
              <p className="text-gray-500 text-sm">{(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
            <XCircle className="w-6 h-6 text-red-500 cursor-pointer" onClick={() => setSelectedFile(null)} />
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={() => execute(selectedFile)}
          className="w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={!selectedFile || status === "loading"}
        >
          {status === "loading" ? "Uploading..." : "Upload File"}
        </button>

        {/* Progress Bar */}
        {status === "loading" && (
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Success Message */}
        {status === "success" && (
          <p className="text-green-400 font-medium text-center mt-4">{output}</p>
        )}

        {/* Error Message */}
        {status === "error" && (
          <div className="text-red-400 font-medium text-center mt-4">
            <p>Error: {error}</p>
            <button
              onClick={retry}
              className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Full Reset Button */}
        <button
          onClick={fullReset}
          className="w-full px-4 py-2 mt-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center justify-center"
        >
          <RefreshCcw className="w-5 h-5 mr-2" /> Reset
        </button>
      </div>
    </div>
  );
}
