import { useMemo, useState } from "react";
import { useAirdropRecipientsProvider } from "@/providers/AirdropRecipientsProvider";
import useAirdropRecipientsPopup from "@/hooks/useAirdropRecipientsPopup";

const VISIBLE_RECIPIENT_COUNT = 3;

const useRecipientSearch = () => {
  const { recipients, isLoading } = useAirdropRecipientsProvider();
  const { isOpen, setIsOpen, handleRecipientClick, isRecipientActive } =
    useAirdropRecipientsPopup();
  const [query, setQuery] = useState("");

  const filteredRecipients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return recipients;
    return recipients.filter((recipient) =>
      (recipient.username || recipient.address).toLowerCase().includes(normalizedQuery)
    );
  }, [recipients, query]);

  return {
    isLoading,
    visibleRecipients: recipients.slice(0, VISIBLE_RECIPIENT_COUNT),
    moreCount: Math.max(recipients.length - VISIBLE_RECIPIENT_COUNT, 0),
    toggleRecipient: handleRecipientClick,
    isRecipientActive,
    isSearchOpen: isOpen,
    openSearch: () => setIsOpen(true),
    closeSearch: () => setIsOpen(false),
    query,
    setQuery,
    filteredRecipients,
    selectFromSearch: (address: string) => {
      handleRecipientClick(address);
      setIsOpen(false);
    },
  };
};

export default useRecipientSearch;
