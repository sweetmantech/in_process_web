import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { flushSync } from "react-dom";

const useVideo = (url?: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setIsLoaded(false);
    setIsError(false);
    videoRef.current?.pause();
    videoRef.current?.load();
  }, [url]);

  const stopPropagation = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const handlePlay = (e: SyntheticEvent) => {
    e.stopPropagation();
    // Mount the <video> synchronously so play() runs inside the tap gesture;
    // iOS Safari may never fire canplay for a video it hasn't been asked to play.
    flushSync(() => setIsPlaying(true));
    const p = videoRef.current?.play();
    // If playback is blocked, reveal the native controls instead of spinning.
    if (p)
      p.catch((err) => {
        if (err?.name === "NotAllowedError") setIsLoaded(true);
      });
  };

  const handleLoaded = () => {
    setIsLoaded(true);
    const p = videoRef.current?.play();
    if (p) p.catch(() => {});
  };

  const handleError = () => {
    setIsError(true);
  };

  return {
    videoRef,
    isPlaying,
    isLoaded,
    isError,
    stopPropagation,
    handlePlay,
    handleLoaded,
    handleError,
  };
};

export default useVideo;
