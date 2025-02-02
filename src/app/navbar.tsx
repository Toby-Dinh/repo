"use client";

import { useState } from "react";

export default function Navbar() {
  const [audioOn, setAudioOn] = useState(false);

  const toggleAudio = () => {
    setAudioOn(!audioOn);
    const audio = document.getElementById("background-audio") as HTMLAudioElement;
    if (audio) {
      if (audioOn) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  };

  return (
    <div className="fixed top-5 right-5 w-full z-50">
      {/* Add your navbar content here */}
      <div className="flex justify-end">
        {/* Audio button here */}
        <button className="w-12 h-12 bg-[#FEED9B] rounded-full" onClick={toggleAudio}>
          {audioOn ? "🔊" : "🔇"}
        </button>
      </div>
    </div>
  );
}