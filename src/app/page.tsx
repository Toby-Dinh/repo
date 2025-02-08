"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const messages = {
    msgs: [
      "Hello Alisa! I programmed this animal crossing themed website for you and I hope you like it. Press SPACE to continue.",
      "I just wanted to say thank you so SO much for being here for me and always supporting me through everything.",
      "I still remember the first time we met and how nervous I felt talking to you... Now here we are, 4 years later and I couldn't be happier.",
      "You've done so much for me and I just want to remind you that I'll always be here for you no matter what and that I love you so much.",
      "I really appreciate everything you do for me to make me happy. You mean so much to me and I'm so grateful that I have you in my life.",
      "Alisa... Will you be my valentine?",
    ],
    yes_msg: ["See you on the 14th of February! I love you!"],
    no_msgs: [
      "Please please please please please please please please please please",
      "Can you please be my valentine...?",
      "What if I got you a puppy?",
      "Okay fine, a puppy and a kitten? Now will you be my valentine?",
    ],
  };

  const [messageIndex, setMessageIndex] = useState(0);
  const [noMessageIndex, setNoMessageIndex] = useState(0);
  const [optionsVisible, setOptionsVisible] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(messages.msgs[0]);
  const [isNoClicked, setIsNoClicked] = useState(false);
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWelcome, setIsWelcome] = useState(true);
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);
  const [zoomInAnimation, setZoomInAnimation] = useState<string>('');
  const typingSpeed = 68; // Adjust typing speed here

  const musicAudioRef = useRef<HTMLAudioElement>(null); 
  const mainThemeAudioRef = useRef<HTMLAudioElement>(null); 
  const messageAudioRef = useRef<HTMLAudioElement>(null);
  const soundEffectAudioRef = useRef<HTMLAudioElement>(null);
  const soundEffect2AudioRef = useRef<HTMLAudioElement>(null);
  const soundEffect3AudioRef = useRef<HTMLAudioElement>(null);
  const soundEffect4AudioRef = useRef<HTMLAudioElement>(null);


  useEffect(() => {
    const handlePlayMainTheme = () => {
      if (mainThemeAudioRef.current && !audioPlayed) {
        mainThemeAudioRef.current.volume = 0.2;
        mainThemeAudioRef.current.play()
        setAudioPlayed(true);
      }
    }
    handlePlayMainTheme();
  })

  useEffect(() => {
    if (isDialogueVisible && musicAudioRef.current) {
      musicAudioRef.current.volume = 0.2; // Set volume to 20%
      musicAudioRef.current.play().catch((error) => {
        console.error("Failed to play background music:", error);
      });
    }
  }, [isDialogueVisible]);

  useEffect(() => {
    if (isWelcome === false) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setIsDialogueVisible(true);
        }, 1500);
      }, 5000);
    }
  }, [isWelcome]);



  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setZoomInAnimation('animate-zoomIn')
        if (soundEffectAudioRef.current) {
          soundEffectAudioRef.current.currentTime = 0; // Reset playback position
          soundEffectAudioRef.current.play().catch((error) => {
            console.error("Failed to play sound effect:", error);
          });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (zoomInAnimation === "animate-zoomIn") {
      setTimeout(() => {
        setIsWelcome(false);
      }, 2000);
    } 
    
    const handleSpace = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        if (optionsVisible && !isNoClicked) {
          if (soundEffect2AudioRef.current) {
            soundEffect2AudioRef.current.currentTime = 0; // Reset playback position
            soundEffect2AudioRef.current.play().catch((error) => {
              console.error("Failed to play sound effect:", error);
            });
          }
          setMessageIndex((prevIndex) => {
            if (prevIndex < messages.msgs.length - 1) {
              return prevIndex + 1;
            } else {
              return prevIndex;
            }
          });
          // yip
        } else if (isNoClicked) {
          setNoMessageIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % messages.no_msgs.length;
            setDisplayMessage(messages.no_msgs[newIndex]);
            return newIndex;
          });
        };
      }
    }
    window.addEventListener("keydown", handleSpace);
    return () => {
      window.removeEventListener("keydown", handleSpace);
    }
  }, [zoomInAnimation, messages.msgs.length, messages.no_msgs.length, optionsVisible, isNoClicked, audioPlayed, isWelcome]);

  useEffect(() => {
    if (optionsVisible && !isNoClicked) {
      setDisplayMessage(messages.msgs[messageIndex]);
    }
  }, [messageIndex, messages.msgs, optionsVisible, isNoClicked]);

  // Typing Effect
  useEffect(() => {
    let currentCharIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeMessage = () => {
      if (currentCharIndex <= displayMessage.length) {
        setTypedMessage(displayMessage.slice(0, currentCharIndex));
        currentCharIndex++;
        timeoutId = setTimeout(typeMessage, typingSpeed);
      }
    };

    setTypedMessage(""); 
    typeMessage();
  
    if (messageAudioRef.current) {
      let audioSrc = "";
    
      if (isNoClicked === true) {
        audioSrc = `/audio/noMsg${noMessageIndex + 1}.wav`;
      } else if (isYesClicked === true) {
        audioSrc = "/audio/yesMsg.wav";
      } else {
        audioSrc = `/audio/msg${messageIndex + 1}.wav`;
      }
    
      messageAudioRef.current.src = audioSrc;
    
      setTimeout(() => {
        messageAudioRef.current && messageAudioRef.current
          .play()
          .catch((error) => {
            console.error("Failed to play message audio:", error);
          });
      }, 250); // 1-second delay
    }
    return () => {
      clearTimeout(timeoutId); 
    };
  }, [displayMessage, typingSpeed, messageIndex, noMessageIndex, isNoClicked, isYesClicked]);

  useEffect(() => {
    if (!optionsVisible || isNoClicked || isYesClicked) {
      setTypedMessage("");
      let currentCharIndex = 0;
      let timeoutId: NodeJS.Timeout;

      const typeMessage = () => {
        if (currentCharIndex <= displayMessage.length) {
          setTypedMessage(displayMessage.slice(0, currentCharIndex));
          currentCharIndex++;
          timeoutId = setTimeout(typeMessage, typingSpeed);
        }
      };

      timeoutId = setTimeout(() => {
        typeMessage();
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [displayMessage, optionsVisible, isNoClicked, isYesClicked]);

  const handleYesClick = () => {
    if (soundEffect3AudioRef.current) {
      soundEffect3AudioRef.current.currentTime = 0;
      soundEffect3AudioRef.current.play().catch((error) => {
        console.error("Failed to play sound effect:", error);
      });
    }
    setTypedMessage(""); // Clear typed message before setting new display message
    setDisplayMessage(messages.yes_msg[0]);
    setOptionsVisible(false);
    setIsNoClicked(false);
    setIsYesClicked(true);
  };

  const handleNoClick = () => {
    if (soundEffect3AudioRef.current) {
      soundEffect3AudioRef.current.currentTime = 0;
      soundEffect3AudioRef.current.play().catch((error) => {
        console.error("Failed to play sound effect:", error);
      });
    }
    setTypedMessage(""); // Clear typed message before setting new display message
    setNoMessageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % messages.no_msgs.length;
      setDisplayMessage(messages.no_msgs[newIndex]);
      return newIndex;
    });
    setIsNoClicked(true);
  };

  return (
    <div className="flex items-center justify-center h-screen relative">
      {isWelcome ? (
        <div className={`h-screen w-full bg-[url('/background.jpg')] bg-cover bg-center ${zoomInAnimation}`}>
          <div className="-mt-24 flex flex-col items-center">
            <img src="./Logo.webp" className="scale-50" alt="Logo" />
            <div className="text-white text-3xl mt-36" style={{ fontFamily: 'system-font' }}>
              Press Space
            </div>
          </div>
          <audio ref={mainThemeAudioRef} src="/audio/mainTheme.mp3" loop />
          <audio ref={soundEffectAudioRef} src="/audio/soundEffects/sound-effect.wav" />
        </div>
      ) : (
        isLoading ? (
          <div className={`flex items-center justify-center h-screen relative`}>
              {/* Gif */}
              <div className="fixed bottom-0 right-0 w-56 h-56">
              <img
                  src="./loader.gif"
                  alt="Loading..."
                  className="w-full h-full object-contain"
              />
              </div>
          </div>
        ) : (
          <>
            <div
              className={`fixed inset-0 z-[-1] bg-[url('/background.jpg')] bg-cover bg-center ${
                !isLoading ? "animate-expansion" : ""
              }`}
            ></div>
            {isDialogueVisible && (
              <div className="flex items-center justify-center h-screen">
                <img src="tom-nook.gif" className="scale-150 absolute z-0 -mt-36" />
                {/* audio */}
                <audio ref={musicAudioRef} src="/audio/music.mp3" loop />
                <audio ref={messageAudioRef} id="message-audio" />
                <audio ref={soundEffect2AudioRef} src="/audio/soundEffects/sound-effect2.wav" />
                <audio ref={soundEffect3AudioRef} src="/audio/soundEffects/sound-effect3.wav" />
                {/* SVG filter */}
                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                  <defs>
                    <filter id="fancy-goo">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                      <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  
                                0 1 0 0 0  
                                0 0 1 0 0  
                                0 0 0 19 -9"
                        result="goo"
                      />
                      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                  </defs>
                </svg>
                {/* speech bubble */}
                <div className="relative flex max-h-[50%] min-h-[300px] min-w-[1024px] w-[50%] mt-[25rem]">
                  <div className="animate-pop-up relative w-[100%] flex flex-col items-center justify-stretch" style={{ filter: "url(#fancy-goo)" }}>
                    <div className="absolute top-2 w-[100%] h-[75%] bg-[#fdf8e3] rounded-[40%_40%_30%_30%/150%_150%_150%_150%] animate-dialogue-top origin-center"></div>
                    <div className="absolute bottom-2 w-[94%] h-[40%] bg-[#fdf8e3] rounded-[5%_5%_20%_20%/100%_100%_100%_100%] animate-dialogue-bottom origin-center"></div>
                    <div className="absolute w-full p-[1.2em_1em_2em_2em] text-[2.5rem] leading-[1.6em] text-[#807256] font-sans font-bold">
                      {typedMessage}
                    </div>
                  </div>
                  <div className="absolute perspective-[2rem] animate-custom-bounce">
                    <div className="inline-block mr-auto px-8 py-3 text-2xl text-[#FFFAE5] bg-[#81A7FF] rounded-[30%/100%_100%_120%_120%] -rotate-[5deg] translate-x-[20%] translate-y-[-30%] font-sans font-semibold">
                      Toby Nook
                    </div>
                  </div>
                  <svg
                    className="absolute bottom-2 left-[50%] translate-x-[-50%] animate-arrow"
                    width="45"
                    height="25"
                    viewBox="0 0 45 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.5 25C18.0184 25 7.59473 12.6404 1.55317 4.96431C-0.122281 2.83559 1.72264 -0.179893 4.39835 0.243337C10.2831 1.17415 18.2164 2.28736 22.5 2.28736C26.7836 2.28736 34.7169 1.17415 40.6017 0.243339C43.2774 -0.17989 45.1223 2.83559 43.4468 4.96431C37.4053 12.6404 26.9816 25 22.5 25Z"
                      fill="#FEB703"
                    />
                  </svg>
                </div>
                {/* options */}
                {optionsVisible && messageIndex === messages.msgs.length - 1 && (
                  <div className="animate-option absolute bg-[#FEED9B] rounded-[41%_41%_41%_41%/48%_48%_41%_44%] shadow-[8px_18px_0_-8px_rgba(0,_0,_0,_0.05)] items-center flex flex-col text-[#807256] px-16 py-10 space-y-3 font-semibold text-[2rem] ml-[56rem]" style={{ filter: "url(#fancy-goo)" }}>
                    <button
                      className="relative inline-flex items-center px-4 text-[2rem] font-semibold text-[#807256] group"
                      onClick={handleYesClick}
                    >
                      <span className="relative z-10">Yes!</span>
                      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-[#ffcf00] rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    </button>
  
                    <button
                      className="relative inline-flex items-center px-4 text-[2rem] font-semibold text-[#807256] group"
                      onClick={handleNoClick}
                    >
                      <span className="relative z-10">Nope.</span>
                      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-[#ffcf00] rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )
      )}
    </div>
  );
}