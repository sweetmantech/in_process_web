import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Address } from "viem";
import useProfile from "./useProfile";
import useArtistEditable from "./useArtistEditable";
import updateProfile from "@/lib/artists/updateProfile";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";

const useArtistEdit = (
  artistProfile: ReturnType<typeof useProfile>,
  artistAddress: Address | undefined
) => {
  const { setSaving, username, bio, instagram, telegram, twitter } = artistProfile;
  const { authorization } = useAuthorizationProvider();
  const usernameRef = useRef(null) as any;
  const bioRef = useRef(null) as any;
  const statusRef = useRef(null) as any;
  const socialRef = useRef(null) as any;

  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { isEditable } = useArtistEditable();

  const toggleEditing = () => setIsEditing(!isEditing);

  useEffect(() => {
    if (searchParams.get("editing") === "true" && isEditable) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [isEditable, searchParams, artistAddress]);

  useEffect(() => {
    if (!usernameRef.current || !bioRef.current || !statusRef.current || !socialRef.current) return;
    if (!isEditing) return;
    const handleMouseDown = async (e: MouseEvent) => {
      if (
        usernameRef.current.contains(e.target) ||
        bioRef.current.contains(e.target) ||
        statusRef.current.contains(e.target) ||
        socialRef.current.contains(e.target)
      )
        return;
      setSaving(true);
      try {
        await updateProfile({
          authHeaders: authorization,
          username,
          bio,
          instagram,
          x: twitter,
          telegram,
        });
      } finally {
        setTimeout(() => {
          toggleEditing();
          setSaving(false);
        }, 500);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isEditing, twitter, instagram, telegram, bio, username]);

  return {
    usernameRef,
    bioRef,
    statusRef,
    socialRef,
    isEditable,
    isEditing,
    toggleEditing,
  };
};

export default useArtistEdit;
