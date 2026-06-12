import { uploadToSupabase } from "@/lib/supabase/storage/uploadToSupabase";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const useEmbedCode = () => {
  const { embedCode } = useMetadataFormProvider();

  const uploadEmbedCode = async () => {
    const blob = new Blob([`<html>\n      ${embedCode}\n      </html>`], { type: "text/html" });
    const file = new File([blob], "embed.html", { type: "text/html" });
    const uri = await uploadToSupabase(file);
    return {
      mime: "text/html" as const,
      animationUrl: uri,
      contentUri: uri,
    };
  };

  return { uploadEmbedCode };
};

export default useEmbedCode;
