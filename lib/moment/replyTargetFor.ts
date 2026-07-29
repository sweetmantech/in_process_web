import truncateAddress from "@/lib/utils/truncateAddress";
import getCommentPreview from "@/lib/moment/getCommentPreview";
import { MintComment } from "@/types/moment";
import { ReplyToTarget } from "@/types/replyToTarget";
import { Address } from "viem";

function replyTargetFor(comment: MintComment): ReplyToTarget {
  const displayName = comment.username || truncateAddress(comment.sender);
  return {
    displayName,
    href: `/${(comment.sender as Address).toLowerCase()}`,
    commentPreview: getCommentPreview(comment),
  };
}

export default replyTargetFor;
