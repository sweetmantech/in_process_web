import { uploadViaApi } from "@/lib/arweave/uploadViaApi";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useUserProvider } from "@/providers/UserProvider";

const useEmbedCode = () => {
  const { embedCode } = useMetadataFormProvider();
  const { getAuthHeaders } = useUserProvider();

  const uploadEmbedCode = async () => {
    const authHeaders = await getAuthHeaders();
    const blob = new Blob([`<html>\n      ${embedCode}\n      </html>`], { type: "text/html" });
    const file = new File([blob], "embed", { type: "text/html" });
    const result = await uploadViaApi(file, authHeaders);
    return {
      mime: "text/html" as const,
      animationUrl: result.arweave_uri,
      contentUri: result.arweave_uri,
    };
  };

  return {
    uploadEmbedCode,
  };
};

export default useEmbedCode;
