import { useIsDefaultCollection } from "@/hooks/useIsDefaultCollection";
import { useSetDefaultCollection } from "@/hooks/useSetDefaultCollection";

interface SetDefaultCollectionButtonProps {
  address: string;
}

const SetDefaultCollectionButton = ({ address }: SetDefaultCollectionButtonProps) => {
  const isDefault = useIsDefaultCollection(address);
  const { setDefault, isPending } = useSetDefaultCollection();

  if (isDefault) {
    return (
      <span className="font-archivo text-[10px] uppercase tracking-[0.07em] text-grey-moss-300">
        default
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => setDefault(address)}
      className="rounded-full border border-grey-moss-100 px-3.5 py-1.5 font-archivo-medium text-[10px] uppercase tracking-[0.07em] text-grey-moss-300 transition-colors hover:border-grey-moss-900 hover:bg-grey-moss-900 hover:text-white disabled:opacity-50"
    >
      {isPending ? "saving..." : "set as default"}
    </button>
  );
};

export default SetDefaultCollectionButton;
