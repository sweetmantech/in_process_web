import { uploadViaApi } from "@/lib/arweave/uploadViaApi";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import type { UploadClient } from "@/types/upload";

const useEmbedCode = () => {
  const { embedCode } = useMetadataFormProvider();

  const uploadEmbedCode = async (client: UploadClient) => {
    const blob = new Blob([`<html>\n      ${embedCode}\n      </html>`], { type: "text/html" });
    const file = new File([blob], "embed", { type: "text/html" });
    const result = await uploadViaApi(file, client);
    return {
      mime: "text/html" as const,
      animationUrl: result.arweave_uri,
      contentUri: result.arweave_uri,
    };
  };

  return { uploadEmbedCode };
};

export default useEmbedCode;
