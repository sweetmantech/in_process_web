import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useHandleInput from "@/hooks/useHandleInput";

const HandleField = () => {
  const { handle, onHandleChange, handleError } = useHandleInput();

  return (
    <fieldset className="flex flex-col gap-[5px]">
      <Label className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300">handle</Label>
      <div className="flex items-center overflow-hidden rounded-md border border-grey-moss-100 bg-[#FDFCFA]">
        <span className="whitespace-nowrap py-2.5 pl-3 font-spectral text-sm text-grey-moss-300">
          inprocess.world/
        </span>
        <Input
          placeholder="ex: sweetman.eth"
          value={handle}
          onChange={(e) => onHandleChange(e.target.value)}
          aria-invalid={Boolean(handleError)}
          className="border-none bg-transparent py-2.5 pl-0.5 pr-3 text-sm"
        />
      </div>
      {handleError && (
        <p className="pt-1 text-sm text-red-600 font-spectral-italic">{handleError}</p>
      )}
    </fieldset>
  );
};

export default HandleField;
