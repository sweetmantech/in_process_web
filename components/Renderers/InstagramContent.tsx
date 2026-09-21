"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

let embedScriptPromise: Promise<void> | null = null;

const loadInstagramEmbedScript = (): Promise<void> => {
  if (window.instgrm) return Promise.resolve();
  if (embedScriptPromise) return embedScriptPromise;

  embedScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Instagram embed script"));
    document.body.appendChild(script);
  });

  return embedScriptPromise;
};

interface InstagramContentProps {
  postUrl: string;
}

// Instagram's own embed widget renders the live post, including carousel
// swipe and a built-in "view on Instagram" link, so we don't need to
// reimplement any of that ourselves.
const InstagramContent = ({ postUrl }: InstagramContentProps) => {
  useEffect(() => {
    let cancelled = false;
    loadInstagramEmbedScript()
      .then(() => {
        if (!cancelled) window.instgrm?.Embeds.process();
      })
      .catch((error) => console.error(error));
    return () => {
      cancelled = true;
    };
  }, [postUrl]);

  return (
    <div className="flex h-full w-full items-center justify-center overflow-auto bg-white [&_iframe]:!max-w-full">
      <blockquote
        key={postUrl}
        className="instagram-media"
        data-instgrm-permalink={postUrl}
        data-instgrm-version="14"
        style={{ margin: 0, width: "100%" }}
      />
    </div>
  );
};

export default InstagramContent;
