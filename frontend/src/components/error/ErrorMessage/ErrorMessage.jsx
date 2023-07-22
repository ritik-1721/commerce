import React from "react";


// Error message component
export default function ErrorMessage({ error }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-4xl text-red-600 font-bold mb-4">
        Oops! Something went wrong.
      </h1>
      {error && <pre className="text-red-600"> {error.message}</pre>}
    </div>
  );
}
