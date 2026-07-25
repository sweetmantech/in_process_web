import { MintComment } from "@/types/moment";

function withCommentDefaults(comment: MintComment): MintComment {
  return {
    ...comment,
    commentId: comment.commentId ?? null,
    replyToId: comment.replyToId ?? null,
    nonce: comment.nonce ?? null,
    replyCount: comment.replyCount ?? 0,
    replies: comment.replies ?? [],
  };
}

export default withCommentDefaults;
