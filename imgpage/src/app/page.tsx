"use client";
import { useRef } from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <main className="flex flex-col items-center w-full max-w-2xl space-y-10">
        <form
          method="post"
          encType="multipart/form-data"
          action="http://localhost:8888/"
          className="w-full space-y-8"
        >
          <h1 className="text-center text-3xl font-semibold text-white">
            Insert an Image
          </h1>

          
          <div className="flex justify-center items-center space-y-4">
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-gradient-to-r from-gray-800 to-gray-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-gradient-to-l transition duration-300 ease-in-out text-lg font-semibold"
            >
              Upload Image
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".jpg, .jpeg, .png"
            />
          </div>

          
          <div className="flex justify-between items-center gap-6 bg-gray-700 p-4 rounded-lg shadow-md">
            <div className="text-gray-300 font-medium text-sm">
              Accepted file types:{" "}
              <span className="font-semibold text-indigo-400">.jpg, .jpeg, .png</span>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-md py-2 px-6 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Enter
            </button>
          </div>
        </form>
      </main>

      <footer className="w-full flex gap-6 flex-wrap items-center justify-center mt-16"></footer>
    </div>
  );
}
