import { useEffect, useRef } from "react";

export default function Welcome() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Set volume to 20%
      audioRef.current.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    }
  }, []);

  return (
    <div className="h-screen w-full bg-[url('/background.jpg')] bg-cover bg-center">
      <div className="-mt-24 flex flex-col items-center">
        <img src="./Logo.webp" className="scale-50" alt="Logo" />
        <div className="text-white text-3xl mt-36">
          Press Space
        </div>
      </div>
      <audio ref={audioRef} src="/audio/mainTheme.mp3" loop />
    </div>
  );
}
