import { useCallback } from "react";
import { useAirdropProvider } from "@/providers/AirdropProvider";

const useAirdropRecipientsPopup = () => {
  const {
    airdropToItems,
    onChangeAddress,
    removeAddress,
    isRecipientSearchOpen,
    setIsRecipientSearchOpen,
  } = useAirdropProvider();

  const handleRecipientClick = useCallback(
    (address: string, username?: string | null) => {
      if (!address) return;
      // Check if recipient is already in airdropToItems
      const existingIndex = airdropToItems.findIndex(
        (item) =>
          typeof item.address === "string" &&
          item.address.length > 0 &&
          item.address.toLowerCase() === address.toLowerCase()
      );

      if (existingIndex !== -1) {
        // Remove if already added
        removeAddress(existingIndex);
      } else {
        // Pass username (e.g. ENS) so the chip shows it instead of the raw address
        onChangeAddress(address, username || undefined);
      }
    },
    [airdropToItems, onChangeAddress, removeAddress]
  );

  const isRecipientActive = useCallback(
    (address: string): boolean => {
      if (!address) return false;
      return airdropToItems.some(
        (item) =>
          typeof item.address === "string" &&
          item.address.length > 0 &&
          item.address.toLowerCase() === address.toLowerCase()
      );
    },
    [airdropToItems]
  );

  return {
    isOpen: isRecipientSearchOpen,
    setIsOpen: setIsRecipientSearchOpen,
    handleRecipientClick,
    isRecipientActive,
  };
};

export default useAirdropRecipientsPopup;
