import { Textarea } from "../ui/textarea";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { cn } from "@/lib/utils";

interface DescriptionInputProps {
  disabled: boolean;
  labelHidden: boolean;
  textareaClassName?: string;
  labelClassName?: string;
}
const DescriptionInput = ({
  disabled,
  labelHidden,
  textareaClassName,
  labelClassName,
}: DescriptionInputProps) => {
  const { form } = useMetadataFormProvider();
  return (
    <fieldset>
      {!labelHidden && (
        <label className={cn("text-grey-moss-600 mb-1 block font-archivo text-sm", labelClassName)}>
          description
        </label>
      )}
      <Textarea
        {...form.register("description")}
        className={cn("focus:border-grey-moss-500 !font-spectral !text-md", textareaClassName)}
        minRows={3}
        maxRows={10}
        placeholder="enter a description"
        disabled={disabled}
      />
      {form.formState.errors.description && (
        <p className="mt-1 font-archivo text-xs text-red-500">
          {form.formState.errors.description.message}
        </p>
      )}
    </fieldset>
  );
};

export default DescriptionInput;
