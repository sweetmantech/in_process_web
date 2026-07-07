"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { useMomentUriUpdateProvider } from "@/providers/MomentUriUpdateProvider";
import TitleInput from "../Media/TitleInput";
import DescriptionInput from "../Media/DescriptionInput";
import Description from "../MomentPage/Description";
import SaveMediaButton from "../MomentManagePage/SaveMediaButton";
import CollectLinkRow from "./CollectLinkRow";
import MomentThumbnailField from "./MomentThumbnailField";

const MomentDetailsCard = () => {
  const { metadata, isOwner } = useMomentProvider();
  const { fileInputRef, blobUrls, previewFileUrl } = useMetadataFormProvider();
  const { selectFile } = useMetadataUploadProvider();
  const { isLoading: isUpdating } = useMomentUriUpdateProvider();
  const canEdit = isOwner && !isUpdating;

  const imageUrl =
    blobUrls?.image || previewFileUrl || metadata?.image || "/images/placeholder.png";

  return (
    <div className="flex flex-col gap-3 rounded-md border border-grey-moss-100 bg-white p-4 shadow-[0_4px_16px_-6px_rgba(27,21,4,0.14)]">
      <CollectLinkRow />
      <MomentThumbnailField
        imageUrl={imageUrl}
        alt={metadata?.name || "Moment thumbnail"}
        isOwner={isOwner}
        disabled={!canEdit}
        fileInputRef={fileInputRef}
        onFileChange={selectFile}
      />
      {isOwner ? (
        <TitleInput
          disabled={!canEdit}
          labelHidden={false}
          inputClassName="rounded-md"
          labelClassName="text-[10.5px] uppercase tracking-wider text-grey-moss-300"
        />
      ) : (
        <p className="font-spectral text-sm text-grey-moss-900">{metadata?.name}</p>
      )}
      {isOwner ? (
        <DescriptionInput
          disabled={!canEdit}
          labelHidden={false}
          textareaClassName="rounded-md"
          labelClassName="text-[10.5px] uppercase tracking-wider text-grey-moss-300"
        />
      ) : (
        <Description />
      )}
      {isOwner && (
        <div className="flex items-center justify-end">
          <SaveMediaButton className="rounded-full px-5 py-1.5 font-archivo text-sm font-semibold" />
        </div>
      )}
    </div>
  );
};

export default MomentDetailsCard;
