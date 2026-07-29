import { MintComment } from "@/types/moment";
import withCommentDefaults from "@/lib/moment/withCommentDefaults";

/** Normalize API comments (and nested replies) with defaults; keep nest structure. */
function mapCommentsTree(comments: MintComment[]): MintComment[] {
  return comments.map((comment) => {
    const next = withCommentDefaults(comment);
    return {
      ...next,
      replies: mapCommentsTree(next.replies ?? []),
    };
  });
}

export default mapCommentsTree;
