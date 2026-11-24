interface UploadProgressOverlayProps {
  uploadProgress?: number;
}

const UploadProgressOverlay = ({ uploadProgress }: UploadProgressOverlayProps) => {
  const progress = Math.round(uploadProgress || 0);
  const isIndeterminate = progress === 0;

  return (
    <div className="absolute inset-0 z-[10000] flex flex-col items-center justify-center bg-black/50">
      <div className="mb-2 font-archivo-medium text-lg text-white">Uploading...</div>
      <div className="h-2 w-3/4 overflow-hidden rounded-full bg-grey-moss-300">
        {isIndeterminate ? (
          <div className="h-full w-1/3 animate-upload-indeterminate rounded-full bg-grey-moss-900" />
        ) : (
          <div
            className="h-full bg-grey-moss-900 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        )}
      </div>
      {!isIndeterminate && <div className="mt-2 font-spectral text-sm text-white">{progress}%</div>}
    </div>
  );
};

export default UploadProgressOverlay;
