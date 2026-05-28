import { useState } from "react";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";
import { getAddress } from "viem";
import { addMomentAdmin } from "@/lib/moment/addMomentAdmin";
import { resolveAddressOrEns } from "@/lib/ens/resolveAddressOrEns";
import { isPermissionError } from "@/lib/errors/isPermissionError";

const useAddCollectionAdmin = () => {
  const { data } = useCollectionProvider();
  const [newAdminAddress, setNewAdminAddress] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const { getAccessToken } = usePrivy();

  const handleAddAdmin = async () => {
    try {
      if (!newAdminAddress.trim()) {
        toast.error("Please enter an admin address or ENS name");
        return;
      }

      if (!data) {
        toast.error("Collection data not available");
        return;
      }

      setIsAdding(true);

      const normalizedAddress = await resolveAddressOrEns(newAdminAddress);

      if (data.admins?.some((admin: string) => getAddress(admin) === normalizedAddress)) {
        toast.error("This address is already an admin.");
        setNewAdminAddress("");
        setIsAdding(false);
        return;
      }

      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Authentication required");
      }

      await addMomentAdmin({
        moment: {
          collectionAddress: data.address as `0x${string}`,
          tokenId: "0",
          chainId: data.chain_id,
        },
        adminAddress: normalizedAddress,
        accessToken,
      });

      toast.success("Admin added successfully.");
    } catch (error: any) {
      console.error("Error adding admin:", error);
      if (isPermissionError(error)) {
        setShowPermissionModal(true);
      } else {
        toast.error(error?.message || "Failed to add admin");
      }
    } finally {
      setIsAdding(false);
      setNewAdminAddress("");
    }
  };

  return {
    newAdminAddress,
    setNewAdminAddress,
    handleAddAdmin,
    isAdding,
    showPermissionModal,
    closePermissionModal: () => setShowPermissionModal(false),
  };
};

export default useAddCollectionAdmin;
