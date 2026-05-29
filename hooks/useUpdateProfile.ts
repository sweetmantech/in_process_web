import { useState } from "react";
import { useUserProvider } from "@/providers/UserProvider";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import updateProfile from "@/lib/artists/updateProfile";
import { extractSocialUsername } from "@/lib/socials/extractSocialUsername";
import { toast } from "sonner";

const useUpdateProfile = () => {
  const { twitter, instagram, username, bio, telegram } = useUserProvider();
  const { authorization } = useAuthorizationProvider();

  const [isLoading, setIsLoading] = useState(false);

  const onSave = async () => {
    setIsLoading(true);
    try {
      await updateProfile({
        authHeaders: authorization,
        username,
        bio,
        x: extractSocialUsername(twitter),
        instagram: extractSocialUsername(instagram),
        telegram: extractSocialUsername(telegram),
      });
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
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
