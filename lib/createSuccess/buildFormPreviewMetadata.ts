import { MomentMetadata } from "@/types/moment";

interface FormBlobUrls {
  preview?: string;
  image?: string;
  pdf?: string;
  video?: string;
  audio?: string;
  model?: string;
}

interface BuildFormPreviewMetadataParams {
  name: string;
  description: string;
  mimeType: string;
  writingText: string;
  blobUrls: FormBlobUrls;
}

const buildFormPreviewMetadata = ({
  name,
  description,
  mimeType,
  writingText,
  blobUrls,
}: BuildFormPreviewMetadataParams): MomentMetadata | null => {
  if (writingText.trim()) {
    return { name, description, image: "", content: { mime: "text/plain", uri: "" } };
  }

  const contentUri = blobUrls.video || blobUrls.audio || blobUrls.pdf || blobUrls.model || "";
  const image = blobUrls.image || blobUrls.preview || "";
  if (!image && !contentUri) return null;

  return {
    name,
    description,
    image,
    content: { mime: mimeType, uri: contentUri || image },
  };
};

export default buildFormPreviewMetadata;
