import { isInPublicCollection } from "@/lib/inpublic/constants";
import { Protocol } from "@/types/moment";

type MomentCommentAccess = {
  protocol?: string | null;
  collectionAddress?: string | null;
};

export const supportsMomentComments = ({ protocol, collectionAddress }: MomentCommentAccess) =>
  protocol === Protocol.InProcess || isInPublicCollection(collectionAddress);

export const canComposeMomentComments = ({ protocol }: MomentCommentAccess) =>
  protocol === Protocol.InProcess;
