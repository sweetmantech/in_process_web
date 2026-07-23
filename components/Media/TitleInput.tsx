import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface TitleInputProps {
  disabled: boolean;
  labelHidden: boolean;
  inputClassName?: string;
  labelClassName?: string;
}
const TitleInput = ({ disabled, labelHidden, inputClassName, labelClassName }: TitleInputProps) => {
  const { form } = useMetadataFormProvider();

  return (
    <fieldset>
      {!labelHidden && (
        <label className={cn("text-grey-moss-600 mb-1 block font-archivo text-sm", labelClassName)}>
          title
        </label>
      )}
      <Input
        type="text"
        {...form.register("name")}
        placeholder="Enter a title"
        disabled={disabled}
        className={cn("font-spectral !text-md", inputClassName)}
      />
      {form.formState.errors.name && (
        <p className="mt-1 font-spectral text-xs text-red-500">
          {form.formState.errors.name.message}
        </p>
      )}
    </fieldset>
  );
};

export default TitleInput;
