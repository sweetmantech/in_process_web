import { cn } from "@/lib/utils";

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ label, active, onClick }: TabButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "-mb-px min-w-[60px] border-b-2 border-transparent px-1 py-2.5 font-archivo text-[12.5px] uppercase tracking-wider text-grey-moss-300 hover:text-grey-moss-900",
        active && "border-b-grey-moss-900 font-archivo-medium text-grey-moss-900"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
