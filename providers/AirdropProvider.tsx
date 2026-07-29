import useAirdrop from "@/hooks/useAirdrop";
import { createContext, useMemo, useContext, useState } from "react";
import AirdropRecipientsProvider from "./AirdropRecipientsProvider";

interface AirdropContextValue extends ReturnType<typeof useAirdrop> {
  isRecipientSearchOpen: boolean;
  setIsRecipientSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AirdropContext = createContext<AirdropContextValue | null>(null);

const AirdropProvider = ({ children }: { children: React.ReactNode }) => {
  const airDrop = useAirdrop();
  const [isRecipientSearchOpen, setIsRecipientSearchOpen] = useState(false);

  const value = useMemo(
    () => ({
      ...airDrop,
      isRecipientSearchOpen,
      setIsRecipientSearchOpen,
    }),
    [airDrop, isRecipientSearchOpen]
  );

  return (
    <AirdropRecipientsProvider>
      <AirdropContext.Provider value={value}>{children}</AirdropContext.Provider>
    </AirdropRecipientsProvider>
  );
};

export const useAirdropProvider = () => {
  const context = useContext(AirdropContext);
  if (!context) {
    throw new Error("useAirdropProvider must be used within a AirdropProvider");
  }
  return context;
};

export default AirdropProvider;
