"use client";

import { ReactNode } from "react";
import useMediaInitialization from "@/hooks/useMediaInitialization";
import { MomentMediaProvider, useMomentMediaProvider } from "@/providers/MomentMediaProvider";
import ContentRenderer from "@/components/Renderers";
import ResetButton from "../MetadataCreation/ResetButton";
import AnimationUpload from "./AnimationUpload";
import MediaSkeleton from "./MediaSkeleton";
import OwnerWarning from "./OwnerWarning";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";
import Collections from "@/components/Collections";
import { MomentMetadata } from "@/types/moment";

interface MediaProps {
  metadata: MomentMetadata | null;
  isOwner: boolean;
  isLoading: boolean;
  isSaving: boolean;
  SaveButton: () => ReactNode;
  isMomentMetadata?: boolean;
  hasMedia?: boolean;
}

const MediaEditInner = ({
  metadata,
  isOwner,
  isSaving,
  SaveButton,
  isMomentMetadata,
}: Omit<MediaProps, "isLoading">) => {
  const { editActive, enterEditMode } = useMomentMediaProvider();

  useMediaInitialization(metadata ?? undefined);

  return (
    <div className="w-full font-archivo">
      <div className="mt-4 max-w-md rounded-lg bg-white p-4 md:p-6 shadow-sm">
        <div className="space-y-4">
          {isMomentMetadata && <Collections />}
          <TitleInput disabled={!isOwner || isSaving} labelHidden={false} />
          <DescriptionInput disabled={!isOwner || isSaving} labelHidden={false} />
          <div className="relative aspect-[571/692] overflow-hidden bg-[url('/grid.svg')] bg-contain">
            {editActive || !metadata ? (
              <AnimationUpload isOwner={isOwner} isSaving={isSaving} />
            ) : (
              <>
                <ContentRenderer metadata={metadata} />
                {!editActive && <ResetButton onReset={enterEditMode} />}
              </>
            )}
          </div>
          <SaveButton />
          <OwnerWarning isOwner={isOwner} />
        </div>
      </div>
    </div>
  );
};

const MediaInner = ({ isLoading, ...props }: MediaProps) => {
  if (isLoading) {
    return <MediaSkeleton />;
  }

  return (
    <MomentMediaProvider>
      <MediaEditInner {...props} />
    </MomentMediaProvider>
  );
};

export default MediaInner;
