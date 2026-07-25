import { MintComment } from "@/types/moment";

/**
 * Nested replies are ignored by the UI for now. Flatten top-level + preview
 * replies into one list (newest first) so existing comments still appear.
 */
function flattenComments(comments: MintComment[]): MintComment[] {
  const flat = comments.flatMap((comment) => {
    const nested = comment.replies ?? [];
    return [{ ...comment, replies: [] }, ...nested.map((reply) => ({ ...reply, replies: [] }))];
  });

  return flat.sort((a, b) => b.timestamp - a.timestamp);
}

export default flattenComments;
