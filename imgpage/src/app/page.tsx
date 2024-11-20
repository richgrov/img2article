"use client"
import { useRef } from "react";

export default function Home() {

  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 mt-10 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <form method="post" encType="multipart/form-data" action="http://localhost:8888/">
          <div>
            <h1 className="text-lg">Insert an image</h1>
          </div>
          <div className="items-center">
            <input
              type="file"
              className="cursor-pointer bg-black-500 text-white py-2 px-4 rounded-md hover:bg-yellow-700"
              accept=".jpg, .jpeg, .png"
            />
          </div>
          <div>
            <button type="submit" className="bg-white text-black rounded-md p-2">
              Enter
            </button>
          </div>
        </form>
       
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
