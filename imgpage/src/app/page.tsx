"use client";
import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import tysonCloud from "@/tysoncloud.png";
import Image from "next/image";
import { FileUpload } from "@/components/FileUpload";

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
    setArticle(result);
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-cover bg-fixed bg-center text-white py-10"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/img/ai.jpg')",
      }}
    >
      <Image
        src={tysonCloud}
        className="absolute top-4 right-4 h-24 w-auto"
        alt="Logo"
      />

      <main
        className={`relative flex flex-col items-center w-full max-w-2xl space-y-10 transition-transform duration-1000 ${animateUp ? "-translate-y-20" : ""
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

        <div id="data-box">
          {dataRecive && (
            <div >
              <p dangerouslySetInnerHTML={{ __html: dataRecive }}>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}