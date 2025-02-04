"use client";

export default function Loading() {
  return (
    <div className="bg-black w-full h-full fixed top-0 left-0 flex items-center justify-center">
      {/* Background loading GIF properly positioned */}
      <div 
        className="absolute left-[50%] top-[50%] rounded-full bg-red-500 animate-expansion"
      /> 
      <div className="fixed bottom-0 right-0 w-56 h-56">
        <img
          src="./loader.gif"
          alt="Loading..."
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
