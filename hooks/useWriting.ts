import { uploadWritingFile } from "@/lib/arweave/uploadWritingFile";
import { generateAndUploadPreview } from "@/lib/writing/generateAndUploadPreview";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useUserProvider } from "@/providers/UserProvider";

const useWriting = () => {
  const { writingText } = useMetadataFormProvider();
  const { getAuthHeaders } = useUserProvider();

  const uploadWriting = async () => {
    const authHeaders = await getAuthHeaders();
    const [writingResult, previewResult] = await Promise.all([
      uploadWritingFile(writingText, authHeaders),
      generateAndUploadPreview(writingText, authHeaders),
    ]);

    return {
      mime: "text/plain" as const,
      animationUrl: writingResult.arweave_uri,
      contentUri: writingResult.arweave_uri,
      image: previewResult?.arweave_uri ?? "",
    };
  };

  return { uploadWriting };
};

export default useWriting;
