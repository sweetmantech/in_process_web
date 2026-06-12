import useLinkPreview from "./useLinkPreview";
import useEmbedCode from "./useEmbedCode";
import useWriting from "./useWriting";
import useFileSelect from "./useFileSelect";
import useRecaptchaToken from "./useRecaptchaToken";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useTypeParam from "./useTypeParam";
import { generateSingleFileMetadata } from "@/lib/metadata/generateSingleFileMetadata";
import { buildMetadataPayload } from "@/lib/metadata/buildMetadataPayload";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import { MomentMetadata } from "@/types/moment";

const useMetadataUpload = () => {
  const type = useTypeParam();
  const { getAuthHeaders } = useAuthorizationProvider();
  const {
    description,
    mimeType,
    name,
    link,
    imageFile,
    animationFile,
    previewFile,
    setUploadProgress,
    setIsUploading,
  } = useMetadataFormProvider();
  const { uploadWriting } = useWriting();
  const { uploadEmbedCode } = useEmbedCode();
  const { selectFile } = useFileSelect();
  const recaptcha = useRecaptchaToken("upload");
  useLinkPreview();

  const generateMetadataUri = async (existingMetadata?: MomentMetadata | null) => {
    const headers = await getAuthHeaders();
    const client = { headers, recaptcha };

    if (type === "writing" || type === "embed") {
      const uploadResult =
        type === "writing" ? await uploadWriting(client) : await uploadEmbedCode(client);
      const metadataResult = await buildMetadataPayload({
        name,
        description,
        externalUrl: link,
        image: "image" in uploadResult ? uploadResult.image : "",
        animationUrl: uploadResult.animationUrl,
        mime: uploadResult.mime,
        contentUri: uploadResult.contentUri,
        client,
        existingMetadata,
      });
      return metadataResult.arweave_uri;
    }

    const hasFilesToUpload = Boolean(previewFile || imageFile || animationFile);
    if (hasFilesToUpload) {
      setIsUploading(true);
      setUploadProgress(0);
    }

    const arweaveUri = await generateSingleFileMetadata({
      imageFile,
      animationFile,
      previewFile,
      mimeType,
      name,
      description,
      link,
      client,
      onProgress: setUploadProgress,
      existingMetadata,
    });

    if (hasFilesToUpload) {
      setUploadProgress(100);
      setIsUploading(false);
    }

    return arweaveUri;
  };

  return {
    generateMetadataUri,
    selectFile,
  };
};

export default useMetadataUpload;
