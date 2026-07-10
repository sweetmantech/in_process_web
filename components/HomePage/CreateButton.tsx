import { Button } from "@/components/ui/button";
import { CircleDot } from "lucide-react";

interface CreateButtonProps {
  onClick: () => void;
}

const CreateButton = ({ onClick }: CreateButtonProps) => {
  return (
    <Button
      className="inline-flex items-center gap-2 rounded-lg !bg-grey-moss-900 px-4 py-2 font-archivo-medium text-base md:text-lg text-white hover:!bg-black md:px-4 md:py-4 md:text-lg"
      onClick={onClick}
    >
      <CircleDot className="size-[18px]" strokeWidth={1.75} />
      create
    </Button>
  );
};

export default CreateButton;
