"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Alisa, will you be my valentine?");
  const [optionsVisible, setOptionsVisible] = useState(true);
  return (
    <div className="flex items-center justify-center h-screen">

      {/* speech bubble */}
      <div className="relative flex max-h-[50%] min-h-[300px] min-w-[1024px] w-[50%] mt-96">
        <div className="relative w-[100%] flex flex-col items-center justify-stretch">
          <div className="absolute top-0 w-[100%] h-[75%] bg-[#fdf8e3] rounded-[40%_40%_20%_20%/150%_150%_150%_150%] "></div>
          <div className="absolute bottom-0 w-[94%] h-[40%] bg-[#fdf8e3] rounded-[5%_5%_20%_20%/100%_100%_100%_100%] "></div>
          <div className="absolute w-full p-[1em_1em_2em_2em] text-[2.5rem] leading-[1.5em] text-[#807256] font-sans font-bold">
            {message}
          </div>
        </div>
        <div className="absolute perspective-[2rem]">
          <div className="inline-block mr-auto px-8 p-2 text-2xl text-[#FFFAE5] bg-[#81A7FF] 
          rounded-[30%/100%_100%_120%_120%] -rotate-[5deg] translate-x-[20%] 
          translate-y-[-45%] font-sans font-semibold">
            Toby Nooks
          </div>
        </div>
        <svg className="absolute bottom-0 left-[50%] translate-x-[-50%] animate-arrow" width="45" height="25" viewBox="0 0 45 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5 25C18.0184 25 7.59473 12.6404 1.55317 4.96431C-0.122281 2.83559 1.72264 -0.179893 4.39835 0.243337C10.2831 1.17415 18.2164 2.28736 22.5 2.28736C26.7836 2.28736 34.7169 1.17415 40.6017 0.243339C43.2774 -0.17989 45.1223 2.83559 43.4468 4.96431C37.4053 12.6404 26.9816 25 22.5 25Z" fill="#F1AE04"/>
        </svg>
      </div>
      {/* options */}
      {optionsVisible && (
        <div className="absolute bg-[#FEED9F] flex flex-col text-[#807256] px-24 py-6 space-y-6 rounded-full font-semibold text-[2rem] ml-[60rem]">
            <button className="relative px-2 rounded-full">
              <span className="relative z-10">Yes</span>
              <div className="absolute inset-x-0 bottom-1 bg-[#FFCF00] h-2/5 w-full rounded-full"></div>
            </button>
          <button>No</button>
        </div>
      )}
    </div>
  );
}