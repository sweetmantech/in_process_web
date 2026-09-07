import { isInPublicCollection } from "@/lib/inpublic/constants";
import { Protocol } from "@/types/moment";

export const supportsMomentComments = ({
  protocol,
  collectionAddress,
}: {
  protocol?: string | null;
  collectionAddress?: string | null;
}) => protocol === Protocol.InProcess || isInPublicCollection(collectionAddress);
