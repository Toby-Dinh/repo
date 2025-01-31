"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("Will you be my valentines Alisa?");
  const [btnVisible, setBtnVisible] = useState(true);

  const moveButton = () => {
    const randomTop = Math.floor(Math.random() * 600) - 300; // Further increased range
    const randomLeft = Math.floor(Math.random() * 600) - 300; // Further increased range
    setPosition({ x: randomTop, y: randomLeft });
  };
  const handleYesClick = () => {
    setMessage("See you on Feb 14! :)");
    setBtnVisible(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-4xl mb-8">
            {message}
          </div>
          <div className="mt-12 flex space-x-6 text-white text-2xl relative">
            {btnVisible && (
              <>
                <button 
                  className="p-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 z-10"
                  onClick={handleYesClick}
                >
                  Yes
                </button>
                <button 
                  className="p-2 px-4 rounded-md bg-red-500 hover:bg-red-600 relative transition-transform duration-300"
                  style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
                  onMouseEnter={moveButton}
                >
                  No
                </button>
              </>
            )}
          </div>
      </div>
    </div>
  );
}