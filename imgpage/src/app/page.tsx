"use client";
import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import tysonCloud from "@/tysoncloud.png";
import Image from "next/image";

function FileUpload(props: { onResponse: (result: any) => void }) {
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  async function sendImage() {
    const input = document.getElementById("file-upload") as HTMLInputElement;

    if (!input || !input.files || !input.files[0]) {
      throw new Error("this shouldn't happen");
    }

    const formData = new FormData();
    formData.append("file", input.files[0]);
    setFileUpload(input.files[0]);

    try {
      const response = await fetch("http://localhost:8888/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        props.onResponse(data);
      } else {
        props.onResponse(undefined);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      props.onResponse(undefined);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-8">
        <div className="flex justify-center items-center space-y-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-gradient-to-r from-gray-800 to-gray-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-gradient-to-l text-lg font-semibold"
          >
            Upload Image
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".jpg, .jpeg, .png"
            onChange={sendImage}
          />
        </div>

        <div className="flex justify-between items-center gap-6 bg-gray-700 p-4 rounded-lg shadow-md">
          <div className="text-gray-300 font-medium text-sm">
            Accepted file types:{" "}
            <span className="font-semibold text-indigo-400">
              .jpg, .jpeg, .png
            </span>
            <div className="items-center text-center py-3 px-5 rounded-lg shadow-lg bg-gray-800">
              {fileUpload ? fileUpload.name : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const [showFailedDialog, setShowFailedDialog] = useState(false);
  const [animateUp, setAnimateUp] = useState(false);
  const [dataRecive, setArticle] = useState("");

  function onResponse(result: any) {
    if (!result) {
      setShowFailedDialog(true);
      return;
    }

    setAnimateUp(true);
    setArticle(JSON.stringify(result));
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[url('/img/ai.jpg')] bg-cover bg-center bg-no-repeat text-white">
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>

      <Image
        src={tysonCloud}
        className="absolute top-4 right-4 z-20 h-24 w-auto"
        alt="Logo"
      />

      <main
        className={`relative flex flex-col items-center w-full max-w-2xl space-y-10 z-30 transition-transform duration-1000 ${
          animateUp ? "-translate-y-20" : ""
        }`}
      >
        <div className="text-center text-white text-4xl space-y-2 ease-in-out">
          <Typewriter
            options={{
              strings: [
                "Search Tool Using",
                "Picture Embedded Data",
                "S.T.U.P.E.D",
              ],
              autoStart: true,
              loop: true,
              delay: 50,
            }}
          />
        </div>

        <div id="info-box">
          <h1 className="text-center text-3xl font-semibold text-white">
            Insert an Image
          </h1>
        </div>

        <FileUpload onResponse={onResponse} />

        {showFailedDialog && (
          <div>
            <p className="text-red-500 bg-gray-800 px-4 py-2 rounded-md shadow-md font-semibold text-center">
              Failed to send image
            </p>
          </div>
        )}
      </main>
      <div id="data-box">
        {dataRecive && (
          <div>
            <p className="text-white-500 bg-gray-800 px-4 py-2 rounded-md shadow-md font-semibold text-center z-30">
              {dataRecive}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
