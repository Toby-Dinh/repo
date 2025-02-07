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

}
