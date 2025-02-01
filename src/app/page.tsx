"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Will you be my valentines?");
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
      </div>
      {/* options */}
      {optionsVisible && (
        <div className="absolute bg-[#FEED9F] flex flex-col text-[#807256] px-28 py-6 space-y-6 rounded-full font-semibold text-[2rem] ml-[60rem]">
          <button>Yes</button>
          <button>No</button>
        </div>
      )}
    </div>
  );
}