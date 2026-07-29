import { MintComment } from "@/types/moment";

/** Immutably update the comment whose commentId matches, walking nested replies. */
function updateCommentInTree(
  comments: MintComment[],
  commentId: string,
  updater: (comment: MintComment) => MintComment
): MintComment[] {
  return comments.map((comment) => {
    if (comment.commentId === commentId) {
      return updater(comment);
    }
    if (comment.replies.length === 0) return comment;
    return {
      ...comment,
      replies: updateCommentInTree(comment.replies, commentId, updater),
    };
  });
}

export default updateCommentInTree;
