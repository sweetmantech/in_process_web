import replyTargetFor from "@/lib/moment/replyTargetFor";
import { MintComment } from "@/types/moment";
import { ReplyToTarget } from "@/types/replyToTarget";

export type FlatReplyEntry = {
  comment: MintComment;
  replyTo: ReplyToTarget;
};

/** Flatten nested replies into a single-level list with parent attribution. */
function flattenReplyEntries(replies: MintComment[], parent: ReplyToTarget): FlatReplyEntry[] {
  const entries: FlatReplyEntry[] = [];
  for (const reply of replies) {
    entries.push({ comment: reply, replyTo: parent });
    entries.push(...flattenReplyEntries(reply.replies, replyTargetFor(reply)));
  }
  return entries;
}

export default flattenReplyEntries;
