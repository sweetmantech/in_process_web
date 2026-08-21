import { isAddress } from "viem";
import resolveEnsToAddress from "./resolveEnsToAddress";
import { AirdropItem } from "@/types/airdrop";
import isEmail from "@/lib/utils/isEmail";

const resolveAddressForAirdrop = async (value: string): Promise<AirdropItem> => {
  if (!value) {
    return { address: "", email: "", status: "invalid", ensName: "" };
  }

  if (isAddress(value)) {
    return {
      address: value,
      email: "",
      status: "valid",
      ensName: "",
    };
  }

  if (isEmail(value)) {
    return {
      address: "",
      email: value.trim().toLowerCase(),
      status: "valid",
      ensName: "",
    };
  }

  const ensAddress = await resolveEnsToAddress(value);

  return {
    address: ensAddress || "",
    email: "",
    status: ensAddress ? "valid" : "invalid",
    ensName: value,
  };
};

export default resolveAddressForAirdrop;
