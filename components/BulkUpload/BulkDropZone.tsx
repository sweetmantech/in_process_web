"use client";

import useBulkDropZone from "@/hooks/useBulkDropZone";

interface BulkDropZoneProps {
  onSingleFile: (file: File) => void;
}

const BulkDropZone = ({ onSingleFile }: BulkDropZoneProps) => {
  const { isDragging, inputRef, onDrop, onDragOver, onDragLeave, onChange, openFileDialog } =
    useBulkDropZone(onSingleFile);

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={openFileDialog}
      className={`group relative flex h-full min-h-[320px] w-full cursor-pointer flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed transition-all duration-200 ${
        isDragging
          ? "scale-[1.01] border-grey-moss-700 bg-grey-moss-200"
          : "border-grey-moss-400 bg-grey-moss-100 hover:border-grey-moss-600 hover:bg-grey-moss-150"
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

      <div
        className={`flex size-16 items-center justify-center rounded-full border-2 transition-all duration-200 ${
          isDragging ? "border-grey-moss-700 bg-grey-moss-300" : "border-grey-moss-400 bg-white"
        }`}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-colors ${isDragging ? "text-grey-moss-900" : "text-grey-moss-500"}`}
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-2 px-6 text-center">
        <p className="font-archivo-medium text-lg text-grey-moss-800">drop files here</p>
        <p className="font-archivo text-sm text-grey-moss-500">or click to browse</p>
        <p className="mt-1 font-archivo text-xs text-grey-moss-400">
          images · video · PDF · audio · 3D
        </p>
        <p className="font-archivo text-xs text-grey-moss-400">
          drop <span className="font-archivo-medium text-grey-moss-600">multiple files</span> to
          bulk mint
        </p>
      </div>
    </div>
  );
};

export default BulkDropZone;
