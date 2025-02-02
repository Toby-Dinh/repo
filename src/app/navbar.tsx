"use client";

import { useState } from "react";

export default function Navbar() {
  const [audioOn, setAudioOn] = useState(false);

  return (
    <div className="fixed top-5 right-5 w-full z-50">
      {/* Add your navbar content here */}
      <div className="flex justify-end">
        {/* Audio button here  */}
        <button className="w-12 h-12 bg-[#FEED9B] rounded-full">
            
        </button>
      </div>
    </div>
  );
}