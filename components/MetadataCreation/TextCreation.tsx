import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import TextInput from "./TextInput";
import { cn } from "@/lib/utils";

const TextCreation = () => {
  const { createdTokenId } = useMomentCreateProvider();

  return (
    <div className={cn("flex size-full min-h-0 flex-col", createdTokenId && "pointer-events-none")}>
      <TextInput />
    </div>
  );
};

export default TextCreation;
