import { useState } from "react";
import { useUserProvider } from "@/providers/UserProvider";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import updateProfile from "@/lib/artists/updateProfile";
import getHandleError from "@/lib/artists/getHandleError";
import ProfileUpdateError from "@/lib/artists/ProfileUpdateError";
import { extractSocialUsername } from "@/lib/socials/extractSocialUsername";
import { toast } from "sonner";

const useUpdateProfile = () => {
  const { twitter, instagram, username, handle, bio, telegram, refetch } = useUserProvider();
  const { getAuthHeaders } = useAuthorizationProvider();

  const [isLoading, setIsLoading] = useState(false);

  const onSave = async () => {
    if (getHandleError(handle)) {
      toast.error("Please fix your handle before saving.");
      return;
    }
    setIsLoading(true);
    try {
      await updateProfile({
        authHeaders: await getAuthHeaders(),
        username,
        handle,
        bio,
        x: extractSocialUsername(twitter),
        instagram: extractSocialUsername(instagram),
        telegram: extractSocialUsername(telegram),
      });
      await refetch();
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error instanceof ProfileUpdateError ? error.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onSave,
  };
};

export default useUpdateProfile;
