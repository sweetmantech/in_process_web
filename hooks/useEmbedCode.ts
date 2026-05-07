import { uploadViaApi } from "@/lib/arweave/uploadViaApi";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const useEmbedCode = () => {
  const { embedCode } = useMetadataFormProvider();

  const uploadEmbedCode = async (headers: HeadersInit) => {
    const blob = new Blob([`<html>\n      ${embedCode}\n      </html>`], { type: "text/html" });
    const file = new File([blob], "embed", { type: "text/html" });
    const result = await uploadViaApi(file, headers);
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
