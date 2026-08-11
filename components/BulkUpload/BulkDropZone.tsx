"use client";

import { Camera } from "lucide-react";
import useBulkDropZone from "@/hooks/useBulkDropZone";
import useIsMobile from "@/hooks/useIsMobile";

interface BulkDropZoneProps {
  onSingleFile: (file: File) => void;
}

const BulkDropZone = ({ onSingleFile }: BulkDropZoneProps) => {
  const isMobile = useIsMobile();
  const {
    isDragging,
    inputRef,
    cameraInputRef,
    onDrop,
    onDragOver,
    onDragLeave,
    onChange,
    onCameraChange,
    openFileDialog,
    openCameraDialog,
  } = useBulkDropZone(onSingleFile);

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={openFileDialog}
      className={`group relative flex h-full min-h-[320px] w-full cursor-pointer flex-col items-center justify-center gap-3.5 rounded-2xl border-2 border-dashed transition-all duration-200 md:gap-3.5 md:rounded-[16px] ${
        isDragging
          ? "border-grey-moss-900 bg-white/50"
          : "border-[#C9C4B9] bg-white/35 hover:border-grey-moss-900 hover:bg-white/50"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,audio/*,.glb,.gltf"
        className="hidden"
        onChange={onChange}
      />
      {isMobile && (
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={onCameraChange}
        />
      )}

      <div className="flex size-[66px] items-center justify-center rounded-full border-[1.5px] border-grey-moss-900 text-grey-moss-900">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-2 px-6 text-center">
        <p className="font-archivo-medium text-xl uppercase tracking-[0.04em] text-grey-moss-900">
          drop files here
        </p>
        <p className="font-spectral-italic text-base uppercase tracking-[0.04em] text-[#6B6456]">
          {isMobile ? "or tap to choose files" : "or click to browse"}
        </p>
        {isMobile && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openCameraDialog();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="mt-0.5 flex items-center gap-1.5 rounded-full border border-grey-moss-300 bg-white/90 px-3 py-1 font-archivo-medium text-xs text-grey-moss-700 active:bg-grey-moss-200"
          >
            <Camera className="size-3.5 text-grey-moss-500" strokeWidth={1.75} />
            Take a photo
          </button>
        )}
        <p className="mt-1 font-archivo text-[12.5px] uppercase tracking-[0.06em] text-[#A8A296]">
          images · video · PDF · audio · 3D
        </p>
        <p className="font-archivo text-[12.5px] uppercase tracking-[0.06em] text-[#A8A296]">
          drop <span className="font-archivo-bold text-[#6B6456]">multiple files</span> to bulk
          create
        </p>
      </div>
    </div>
  );
};

export default BulkDropZone;
