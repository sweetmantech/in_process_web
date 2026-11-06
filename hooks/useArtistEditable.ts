import { useUserProvider } from "@/providers/UserProvider";

const useArtistEditable = (artistId: string | undefined) => {
  const { userId } = useUserProvider();

  const isEditable = Boolean(artistId) && artistId === userId;

  return {
    isEditable,
  };
};

export default useArtistEditable;
