import { MintComment } from "@/types/moment";

function getCommentPreview(comment: MintComment): string {
  const text = comment.comment.trim();
  if (!text) return "collected";
  return text.length > 36 ? `${text.slice(0, 36).trimEnd()}...` : text;
}

export default getCommentPreview;
