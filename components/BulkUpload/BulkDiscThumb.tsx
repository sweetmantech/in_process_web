const BulkDiscThumb = () => (
  <div className="relative size-[70%] rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-md">
    <div className="absolute inset-0 rounded-full border border-neutral-700/50" />
    <div className="absolute inset-[8%] rounded-full border border-neutral-600/25" />
    <div className="absolute inset-[18%] rounded-full border border-neutral-600/20" />
    <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-green-600 via-green-500 to-green-700">
      <div className="absolute inset-[40%] rounded-full bg-neutral-900" />
    </div>
  </div>
);

export default BulkDiscThumb;
