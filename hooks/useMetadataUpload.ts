import useLinkPreview from "./useLinkPreview";
import useEmbedCode from "./useEmbedCode";
import useWriting from "./useWriting";
import useFileSelect from "./useFileSelect";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useTypeParam from "./useTypeParam";
import { generateSingleFileMetadata } from "@/lib/metadata/generateSingleFileMetadata";
import { buildMetadataPayload } from "@/lib/metadata/buildMetadataPayload";
import { MomentMetadata } from "@/types/moment";

const useMetadataUpload = () => {
  const type = useTypeParam();
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
  useLinkPreview();

  const generateMetadataUri = async (existingMetadata?: MomentMetadata | null) => {
    if (type === "writing" || type === "embed") {
      const uploadResult =
        type === "writing" ? await uploadWriting() : await uploadEmbedCode();
      const metadataResult = await buildMetadataPayload({
        name,
        description,
        externalUrl: link,
        image: "image" in uploadResult ? uploadResult.image : "",
        animationUrl: uploadResult.animationUrl,
        mime: uploadResult.mime,
        contentUri: uploadResult.contentUri,
        existingMetadata,
      });
      return metadataResult.uri;
    }

    const hasFilesToUpload = Boolean(previewFile || imageFile || animationFile);
    if (hasFilesToUpload) {
      setIsUploading(true);
      setUploadProgress(0);
    }

    try {
      const uri = await generateSingleFileMetadata({
        imageFile,
        animationFile,
        previewFile,
        mimeType,
        name,
        description,
        link,
        onProgress: setUploadProgress,
        existingMetadata,
      });
      if (hasFilesToUpload) setUploadProgress(100);
      return uri;
    } catch (err) {
      if (hasFilesToUpload) setUploadProgress(0);
      throw err;
    } finally {
      if (hasFilesToUpload) setIsUploading(false);
    }
  };

  return {
    generateMetadataUri,
    selectFile,
  };
};

export default useMetadataUpload;
