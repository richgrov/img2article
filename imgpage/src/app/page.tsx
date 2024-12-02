"use client";
import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import tysonCloud from "@/tysoncloud.png";
import Image from "next/image";

function FileUpload(props: { onResponse: (result: any) => void }) {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputVisibleBack, setInputVisibleBack] = useState(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  function noFile(check: boolean) {
    setInputVisible(check);
  }

  async function sendImage(event: React.ChangeEvent<HTMLInputElement>) {
    const input = document.getElementById("file-upload") as HTMLInputElement;

    if (!input || !input.files || !input.files[0]) {
      throw new Error("this shouldn't happen");
    }

    //setArticle("Loading...");
    noFile(false);
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
        setInputVisibleBack(true);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      props.onResponse(undefined);
      setInputVisibleBack(true);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-8">
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

        {inputVisible && (
          <div>
            <p className="text-red-500 bg-gray-800 px-4 py-2 rounded-md shadow-md font-semibold text-center">
              Please select a file to upload
            </p>
          </div>
        )}

        {inputVisibleBack && (
          <div>
            <p className="text-red-500 bg-gray-800 px-4 py-2 rounded-md shadow-md font-semibold text-center">
              Failed to send image
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function Home() {
  const [dataTransfrom, setTransfrom] = useState(false);
  const [dataRecive, setArticle] = useState("");

  function transfrom() {
    setTransfrom(true);
  }

  function onResponse(result: any) {
    if (!result) {
      transfrom();
      return;
    }

    article(result);
  }

  function article(data: JSON) {
    setArticle("data!");
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[url('/img/ai.jpg')] bg-cover bg-center bg-no-repeat text-white">
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>

      <Image
        src={tysonCloud}
        className="absolute top-4 right-4 z-20 h-24 w-auto"
        alt="Logo"
      />

      <main className="relative flex flex-col items-center w-full max-w-2xl space-y-10 z-30">
        <div
          className={` text-center text-white text-4xl space-y-2 transition-transform duration-1000 ease-in-out ${
            dataTransfrom ? "-translate-y-20" : ""
          }`}
        >
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

        <div
          id="info-box"
          className={`transition-transform duration-1000 ease-in-out ${
            dataTransfrom ? "-translate-y-20" : ""
          }`}
        >
          <h1 className="text-center text-3xl font-semibold text-white">
            Insert an Image
          </h1>
        </div>

        <FileUpload onResponse={onResponse} />

        <div
          id="data-box"
          className={`transition-transform duration-1000 ease-in-out ${
            dataTransfrom ? "-translate-y-20" : ""
          }`}
        >
          {dataRecive && (
            <div>
              <p className="text-white-500 bg-gray-800 px-4 py-2 rounded-md shadow-md font-semibold text-center">
                {dataRecive}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
