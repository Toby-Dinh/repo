"use client";

import { useState, useEffect, useRef, useCallback, HtmlHTMLAttributes } from "react";

export default function Home() {
  const messages = {
    msgs: [
      "Hello Alisa! I programmed this animal crossing themed website for you and I hope you like it. Press SPACE to continue.",
      "I just wanted to say thank you so SO much for being here for me and always supporting me through everything.",
      "I still remember the first time we met and how nervous I felt talking to you... Now here we are, 4 years later and I couldn't be happier.",
      "You always brighten my day and I'm so lucky to have you in my life. You are the most kindest, caring and prettiest girl I could ever ask for.",
      "I just want to remind you that I'll always be here for you no matter what. I love you so much and I promise to always make you happy",
      "Alisa... Will you be my valentine?",
    ],
    yes_msg: ["See you on the 14th of February! I love you!"],
    no_msgs: [
      "I'll do anything for you want forever if you say yes to being my valentine. Will you be my valentine now?",
      "What if I got you a puppy?",
      "Okay fine, a puppy and a kitten? Now will you be my valentine?",
      "I'll bake you cookies, cake, AND cupcakes... will you please be my valentine?",
      "You're a tough negotiator... Okay fine, I promise I'll stop scratching my butt in front of you, am I valentine-worthy now?",
      "I'll wipe my face and mouth every time after I finish eating, will you be my valentine now?",
      "NOT EVEN THAT WOULD WORK? If I stop eating McDonalds and KFC, will you be my valentine?",
      "YOU KNOW WHAT I DONT EVEN WANT TO BE YOUR VALENTINE... but if I got you flowers, will you be my valentine?",
      "Fine... you leave me no choice, I'll give you bing and bong.",
      "Okay how about I give you all the money in my bank account. Can you please... please be my valentine.",
      "YOU LEAVE ME NO CHOICE, BE MY VALENTINE OR ELSE... OR ELSE... um... OR ELSE I'LL GIVE BING AND BONG AWAY",
      "If you be my valentine, I'll send you all the money in my bank account.",
      "Hmmm... how about if I let you choose whatever place we eat at for a whole year",
    ],
  };

  const [messageIndex, setMessageIndex] = useState(0);
  const [noMessageIndex, setNoMessageIndex] = useState(0);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(messages.msgs[0]);
  const [isNoClicked, setIsNoClicked] = useState(false);
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWelcome, setIsWelcome] = useState(true);
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);
  const [zoomInAnimation, setZoomInAnimation] = useState<string>('');
  const [fadeAnimation, setFadeAnimation] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [arrowVisible, setArrowVisible] = useState(false);
  // const [reaction, setReaction] = useState<string>('neutral');
  const [hoveredOption, setHoveredOption] = useState<string>("yes");
  const [pointerPosition, setPointerPosition] = useState({ top: 420, left: 1265 });
  const typingSpeed = 28.8; // Adjust typing speed here

  const musicAudioRef = useRef<HTMLAudioElement>(null); 
  const mainThemeAudioRef = useRef<HTMLAudioElement>(null); 
  const messageAudioRef = useRef<HTMLAudioElement>(null);
  const soundEffectAudioRef = useRef<HTMLAudioElement>(null);
  const soundEffect2AudioRef = useRef<HTMLAudioElement>(null);
  const soundEffect3AudioRef = useRef<HTMLAudioElement>(null);
  const soundEffect4AudioRef = useRef<HTMLAudioElement>(null);

  const loveSoundEffect = useRef<HTMLAudioElement>(null);
  const sorrownessSoundEffect = useRef<HTMLAudioElement>(null);

  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  const [currentReaction, setCurrentReaction] = useState("neutral");
  const [pendingReaction, setPendingReaction] = useState<string | null>(null);

  useEffect(() => {
    const reactions = ["neutral", "love", "sorrowness", "sorrownesstolove"];
    reactions.forEach((r) => {
      const video = document.createElement("video");
      video.src = `/${r}.mov`;
      video.preload = "auto";
    });
  }, []);

  const transitionToReaction = (newReaction: string) => {
    if (newReaction === currentReaction) return;
    setPendingReaction(newReaction);
  };

  
  useEffect(() => {
    const handlePlayMainTheme = () => {
      if (mainThemeAudioRef.current && !audioPlayed) {
        mainThemeAudioRef.current.volume = 0.2;
        mainThemeAudioRef.current.play()
        setAudioPlayed(true);
      }
    }
    document.addEventListener("click", handlePlayMainTheme);

    return () => {
      document.addEventListener("click", handlePlayMainTheme)
    };
  }, [audioPlayed])

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

  // Space to enter the loading page 
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setTimeout(() => {
          setFadeAnimation('animate-fade');
        }, 250)
        setTimeout(() => {
          setZoomInAnimation('animate-zoomIn');
          setTimeout(() => {
            setIsWelcome(false);
          }, 2000);
        }, 1000);
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

  // Hook to go to the next message
  useEffect(() => {
    const handleSpace = (event: KeyboardEvent) => {
      if (event.code !== "Space" || isWelcome || isLoading) return;
  
      if (!optionsVisible && !isNoClicked && isTypingComplete) {
        if (messageIndex < messages.msgs.length - 1) {
          soundEffect2AudioRef.current?.play().catch((error) =>
            console.error("Failed to play sound effect:", error)
          );
          setMessageIndex((prevIndex) => prevIndex + 1);
        }
      }
    };

    window.addEventListener("keydown", handleSpace);
    return () => window.removeEventListener("keydown", handleSpace);

  }, [messages.msgs.length, messageIndex, messages.no_msgs.length, optionsVisible, isNoClicked, isWelcome, isTypingComplete, isLoading]);

  useEffect(() => {
    if (!isYesClicked && !isNoClicked) {
      setDisplayMessage(messages.msgs[messageIndex]);
    }
  }, [messageIndex, messages.msgs, isYesClicked, isNoClicked]);

  // Typing Effect
  useEffect(() => {
    if (!isDialogueVisible) return;

    let currentCharIndex = 0;
    let timeoutId: NodeJS.Timeout;

    setTypedMessage(""); 
    setIsTypingComplete(false);
    setArrowVisible(false);

    const typeMessage = () => {
      if (currentCharIndex <= displayMessage.length) {
        setTypedMessage(displayMessage.slice(0, currentCharIndex));
        currentCharIndex++;
        timeoutId = setTimeout(typeMessage, typingSpeed);
      } else {
        setIsTypingComplete(true);
        if (messageIndex !== messages.msgs.length - 1) {
          setArrowVisible(true);
        }
        if ((isNoClicked || messageIndex === messages.msgs.length - 1) && !isYesClicked) {
          setOptionsVisible(true);
        }
      }
    };

    typeMessage();
  
    if (messageAudioRef.current) {
      let audioSrc = "";
      if (isNoClicked) {
        audioSrc = `/audio/noMsg${noMessageIndex + 1}.wav`;
      } else if (isYesClicked) {
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
  }, [displayMessage, typingSpeed, messageIndex, noMessageIndex, isNoClicked, isYesClicked, isDialogueVisible]);

  const playSoundEffect = () => {
    soundEffect3AudioRef.current?.play().catch((error) => {
      console.error("Failed to play sound effect:", error);
    });
    if (soundEffect3AudioRef.current) {
      soundEffect3AudioRef.current.currentTime = 0;
    }
  };

  const playLoveSound = () => {
    loveSoundEffect.current?.play().catch((error) => {
      console.error("Failed to play sound effect:", error);
    });
    if (loveSoundEffect.current) {
      loveSoundEffect.current.currentTime = 0;
    }
  }

  const playSorrownessSound = () => {
    sorrownessSoundEffect.current?.play().catch((error) => {
      console.error("Failed to play sound effect:", error);
    });
    if (sorrownessSoundEffect.current) {
      sorrownessSoundEffect.current.currentTime = 0;
    }
  }
  
  const handleYesClick = () => {
    if (currentReaction === "sorrowness") {
      transitionToReaction("sorrownesstolove");
    } else {
      transitionToReaction("love");
    }
    setTypedMessage("");
    setDisplayMessage(messages.yes_msg[0]);
    setOptionsVisible(false);
    setIsNoClicked(false);
    setIsYesClicked(true);
    playSoundEffect();
    playLoveSound();
  };
  
  const sorrownessPlayedOnce = useRef(false);
  const [hasPlayedSorrownessSound, setHasPlayedSorrownessSound] = useState(false);

  const handleNoClick = () => {
    setOptionsVisible(false)
    transitionToReaction("sorrowness");
    setTypedMessage("");
    setNoMessageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % messages.no_msgs.length;
      setDisplayMessage(messages.no_msgs[newIndex]);
      return newIndex;
    });
    setIsNoClicked(true);
    playSoundEffect();
    if (!hasPlayedSorrownessSound) {
      playSorrownessSound();
      setHasPlayedSorrownessSound(true);
    }
  };
  const [isSorrownessLooping, setIsSorrownessLooping] = useState(false);

  useEffect(() => {
    if (currentReaction === "sorrowness" && currentVideoRef.current) {
      const video = currentVideoRef.current;
      // Disable built‑in looping
      video.loop = false;
      
      const threshold = 0.1; // seconds before the end
      const handleTimeUpdate = () => {
        if (video.duration && video.currentTime >= video.duration - threshold) {
          // Jump back to 5 seconds and resume playback
          video.currentTime = 5;
          video.play();
        }
      };
  
      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, [currentReaction]);
  

  return (
    <div className="flex items-center justify-center h-screen relative">
      {isWelcome ? (
        <div className={`h-screen w-full ${zoomInAnimation}`}>
          <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
            <source src="/titleBackground.mov" type="video/mp4" />
          </video>
          <div className="-mt-24 flex flex-col items-center">
            <img src="./Logo.webp" className={`scale-50 -mt-10 ${fadeAnimation}`} alt="Logo" />
            <div className={`text-white text-3xl mt-36 ${fadeAnimation}`} style={{ fontFamily: 'system-font' }}>
              <div className="wave-text">
                {"Press Space".split("").map((char, index) => (
                  char === " " ? (
                    <span key={index} className="inline-block" style={{ marginRight: "0.3em" }}>{char}</span>
                  ) : (
                    <span
                      key={index}
                      className="inline-block animate-wave"
                      style={{ animationDelay: `${index * 0.1}s` }} // Stagger the animation by index
                    >
                      {char}
                    </span>
                  )
                ))}
              </div>
            </div>
          </div>
          <audio ref={mainThemeAudioRef} src="/audio/mainTheme.mp3" loop />
          <audio ref={soundEffectAudioRef} src="/audio/soundEffects/sound-effect.wav" />
        </div>
      ) : (
        isLoading ? (
          <div className={`flex items-center justify-center h-screen relative`}>
              {/* Gif */}
              <div className="fixed bottom-0 right-0 w-72 h-72">
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
              className={`fixed inset-0 z-0 ${
                !isLoading ? "animate-expansion" : ""
              }`}
            >
              <video
                ref={currentVideoRef}
                preload="auto"
                autoPlay
                muted
                // If the reaction is "sorrowness", disable looping and add onEnded handler;
                // Otherwise, loop normally.
                loop={currentReaction === "sorrowness" ? false : true}
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ opacity: 1 }}
                key={currentReaction}
              >
                <source src={`/${currentReaction}.mov`} type="video/mp4" />
              </video>
              {pendingReaction && (
                <video
                  ref={nextVideoRef}
                  preload="auto"
                  autoPlay
                  loop
                  muted
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  style={{ opacity: 0 }}
                  onCanPlay={() => {
                    if (nextVideoRef.current) {
                      nextVideoRef.current.style.opacity = "1";
                    }
                    if (currentVideoRef.current) {
                      currentVideoRef.current.style.opacity = "0";
                    }
                    setTimeout(() => {
                      setCurrentReaction(pendingReaction);
                      setPendingReaction(null);
                    }, 1000);
                  }}
                  key={pendingReaction}
                >
                  <source src={`/${pendingReaction}.mov`} type="video/mp4" />
                </video>
              )}
            </div>
            {isDialogueVisible && (
              <div className="flex items-center justify-center h-screen">
                {/* <img src="tom-nook.gif" className="scale-150 absolute z-0 -mt-36" /> */}
                {/* audio */}
                <audio ref={musicAudioRef} src="/audio/music.mp3" loop />
                <audio ref={messageAudioRef} id="message-audio" />
                <audio ref={soundEffect2AudioRef} src="/audio/soundEffects/sound-effect2.wav" />
                <audio ref={soundEffect3AudioRef} src="/audio/soundEffects/sound-effect3.wav" />
                <audio ref={loveSoundEffect} src="/audio/soundEffects/love.mp3" />
                <audio ref={sorrownessSoundEffect} src="/audio/soundEffects/sorrowness.mp3" />
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
                  className={`absolute bottom-2 left-[50%] translate-x-[-50%] animate-arrow ${arrowVisible ? 'opacity-100' : 'opacity-0'}`}
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
                {optionsVisible && (
                  <>
                    <div 
                      className={`animate-pop-up absolute bg-[#FEED9B] rounded-[41%_41%_41%_41%/48%_48%_41%_44%] shadow-[8px_18px_0_-8px_rgba(0,_0,_0,_0.05)] items-center flex flex-col text-[#807256] px-16 py-10 space-y-3 font-semibold text-[2rem] ml-[56rem]`} 
                      style={{ filter: "url(#fancy-goo)" }}
                    >

                      <button
                        className="relative inline-flex items-center px-4 text-[2rem] font-semibold text-[#807256] group"
                        onMouseEnter={(e) => {
                          setHoveredOption("yes");
                          setPointerPosition({
                            top: 420,
                            left: 1265
                          });
                        }}
                        onClick={handleYesClick}
                      >
                        <span className="relative z-10">
                        {"Yes!".split("").map((char, index) => (
                          <span
                            key={index}
                            className="inline-block group-hover:animate-wave-once"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            {char}
                          </span>
                        ))}
                        </span>
                        <span
                          className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#ffcf00] rounded-lg transition-opacity duration-300 ${
                            hoveredOption === "yes" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                        ></span>
                      </button>
    
                      <button
                        className="relative inline-flex items-center px-4 text-[2rem] font-semibold text-[#807256] group"
                        onMouseEnter={(e) => {
                          setHoveredOption("no");;
                          setPointerPosition({
                            top: 485,
                            left: 1265,
                          });
                        }}
                        onClick={handleNoClick}
                      >
                        <span className="relative z-10">
                          {"Nope.".split("").map((char, index) => (
                            <span
                              key={index}
                              className="inline-block group-hover:animate-wave-once"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              {char}
                            </span>
                          ))}
                        </span>
                        <span
                          className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#ffcf00] rounded-lg transition-opacity duration-300 ${
                            hoveredOption === "no" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                        ></span>
                      </button>
                    </div>
                    {(pointerPosition.left !== 0) && (
                      <img
                        src="/pointer.png"
                        alt="Pointer"
                        className="absolute w-[4.5rem] h-[3.5rem] animate-back-and-fourth"
                        style={{
                          top: pointerPosition.top,
                          left: pointerPosition.left,
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </>
        )
      )}
    </div>
  );
}