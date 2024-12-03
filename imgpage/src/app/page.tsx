"use client";
import React, { Ref, useEffect, useReducer, useRef, useState } from "react";
import tysonCloud from "@/tysoncloud.png";
import Image from "next/image";
import { FileUpload } from "@/components/FileUpload";

const logoLines = ["Search", "Tool", "Using", "Picture", "Embedded", "Data"];
interface LogoState {
  progress: number[];
  done: boolean;
}

function typingReducer(state: LogoState): LogoState {
  const progress = [...state.progress];
  let done = true;

  for (let i = 0; i < logoLines.length; i++) {
    if (++progress[i] <= logoLines.length) {
      done = false;
      break;
    }
  }

  return { progress, done };
}

function AnimatedLogo() {
  const lines = useRef(new Array<Ref<HTMLParagraphElement>>());
  const [animation, addCharacter] = useReducer(typingReducer, {
    progress: logoLines.map(() => 0),
    done: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      addCharacter();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {logoLines.map((line, i) => {
        if (!lines.current![i]) {
          lines.current![i] = React.createRef();
        }

        return (
          <p
            key={i}
            ref={lines.current![i]}
            className={`transition ease-in duration-1000 ${
              animation.done ? "translate-x-20" : ""
            }`}
          >
            {line.substring(0, Math.min(animation.progress[i], 1))}
            <span
              className={`transition ease-in duration-1000 ${
                animation.done ? "opacity-0" : ""
              }`}
            >
              {line.substring(
                Math.min(animation.progress[i], 1),
                animation.progress[i]
              )}
            </span>
          </p>
        );
      })}
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
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-cover bg-center bg-no-repeat text-white"
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
        className={`relative flex flex-col items-center w-full max-w-2xl space-y-10 transition-transform duration-1000 ${
          animateUp ? "-translate-y-20" : ""
        }`}
      >
        <div className="text-white text-4xl space-y-2 ease-in-out">
          <AnimatedLogo />
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
            <p className="text-white-500 bg-gray-800 px-4 py-2 rounded-md shadow-md font-semibold text-center">
              {dataRecive}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
