import { useEffect, useMemo, useState } from "react";
import { useArtistProfile } from "./useArtistProfile";
import { Address } from "viem";
import truncateAddress from "@/lib/truncateAddress";

const useProfile = (artistAddress?: Address) => {
  const { data, isLoading, refetch } = useArtistProfile(artistAddress);
  const [username, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [twitter, setTwitter] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [telegram, setTelegram] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setUserName(data.username || "");
      setBio(data.bio || "");
      setTwitter(data.x || "");
      setTelegram(data.telegram || "");
      setInstagram(data.instagram || "");
      setPhoneNumber(data.phone?.phone_number ?? "");
      setPhoneVerified(data.phone?.verified ?? false);
    }
  }, [data, artistAddress]);

  const displayName = useMemo(
    () => username || truncateAddress(artistAddress as string),
    [username, artistAddress]
  );

  return {
    userId: data?.id,
    displayName,
    username,
    setUserName,
    bio,
    setBio,
    isLoading,
    saving,
    setSaving,
    twitter,
    telegram,
    instagram,
    setTwitter,
    setTelegram,
    setInstagram,
    refetch,
    phoneNumber,
    phoneVerified,
    setPhoneVerified,
  };
};

export default useProfile;
