import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import usePrompt from "@/hooks/usePrompt";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const Prompt = () => {
  const { creating } = useMomentCreateProvider();
  const { form } = useMetadataFormProvider();
  const { placeholder, onActive, promptRef, rotatePrompt } = usePrompt();

  return (
    <div className="flex w-full flex-col items-start">
      <label
        htmlFor="title"
        className="mb-1 font-archivo-medium text-[10.5px] uppercase tracking-[0.14em] text-[#A8A296]"
      >
        title
      </label>
      <input
        id="title"
        {...form.register("name")}
        placeholder={placeholder}
        onFocus={onActive}
        onBlur={rotatePrompt}
        disabled={Boolean(creating)}
        className="w-full border-0 border-b-[1.5px] border-[#DCD6CA] bg-transparent px-0.5 py-[9px] font-archivo text-[15px] text-grey-moss-900 outline-none transition-colors placeholder:text-[#B4AEA2] focus:border-grey-moss-900"
        ref={(e) => {
          const { ref } = form.register("name");
          ref(e);
          if (promptRef) {
            if (typeof promptRef === "function") {
              promptRef(e);
            } else {
              promptRef.current = e;
            }
          }
        }}
      />
      {form.formState.errors.name && (
        <p className="mt-1 font-archivo text-xs text-red-500">
          {form.formState.errors.name.message}
        </p>
      )}
    </div>
  );
};

export default Prompt;
