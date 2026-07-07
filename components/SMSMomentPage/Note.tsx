import { InfoIcon } from "lucide-react";

const Note = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-md border-l-2 border-tan-gold bg-grey-moss-50 py-3 pl-4 pr-4">
      <div className="flex items-center gap-3">
        <InfoIcon className="h-5 w-5 flex-shrink-0 text-grey-moss-300" />
        <p className="font-archivo text-sm italic text-grey-moss-900">{children}</p>
      </div>
    </div>
  );
};

export default Note;
