import { useState } from "react";
import { useMomentTransfersProvider } from "@/providers/MomentCollectorsProvider";
import TransferItem from "./TransferItem";
import FetchMore from "../FetchMore";
import { ChevronDown } from "lucide-react";

const Collectors = () => {
  const { transfers, isLoading, hasMore, fetchMore } = useMomentTransfersProvider();
  const [isOpen, setIsOpen] = useState(false);

  if (transfers.length === 0 || isLoading) return null;

  return (
    <div className="mt-2 w-full rounded-lg bg-white px-2.5 py-3 md:mt-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between"
      >
        <p className="font-archivo text-sm">
          collectors ({transfers.length}
          {hasMore ? "+" : ""})
        </p>
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="no-scrollbar mt-2 max-h-[200px] overflow-hidden overflow-y-auto">
          <div className="space-y-2">
            {transfers.map((c) => (
              <TransferItem key={c.id} {...c} />
            ))}
          </div>
          {hasMore && <FetchMore fetchMore={() => fetchMore()} />}
        </div>
      )}
    </div>
  );
};

export default Collectors;
