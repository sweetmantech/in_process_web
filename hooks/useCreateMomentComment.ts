import { useCallback, useState } from "react";
import { Address } from "viem";
import { toast } from "sonner";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { createCommentApi, CreateCommentReplyTo } from "@/lib/moment/createCommentApi";
import fetchOperationalSmartWallet from "@/lib/smartwallets/fetchOperationalSmartWallet";
import { MintComment } from "@/types/moment";

export type SubmitCommentArgs = {
  text: string;
  /** Parent protocol comment when posting a reply. */
  parent?: MintComment;
};

type UseCreateMomentCommentArgs = {
  addComment: (comment: MintComment) => void;
  addReply: (parentCommentId: string, reply: MintComment) => void;
};

async function resolveOnchainCommenter(sender: Address): Promise<Address> {
  try {
    return await fetchOperationalSmartWallet(sender);
  } catch {
    return sender;
  }
}

const useCreateMomentComment = ({ addComment, addReply }: UseCreateMomentCommentArgs) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { moment } = useMomentProvider();
  const { getAuthHeaders } = useAuthorizationProvider();
  const { isPrepared, username } = useUserProvider();
  const { primaryWallet } = useWalletsProvider();

  const submitComment = useCallback(
    async ({ text, parent }: SubmitCommentArgs): Promise<boolean> => {
      const trimmed = text.trim();
      if (!trimmed) {
        toast.error("Comment cannot be empty");
        return false;
      }
      if (!isPrepared()) return false;
      if (!primaryWallet) {
        toast.error("No wallet connected");
        return false;
      }

      if (parent && (!parent.commentId || !parent.nonce)) {
        toast.error("This comment cannot be replied to");
        return false;
      }

      setIsSubmitting(true);
      try {
        let replyTo: CreateCommentReplyTo | undefined;
        if (parent?.commentId && parent.nonce) {
          const commenter = await resolveOnchainCommenter(parent.sender as Address);
          replyTo = {
            commenter,
            contractAddress: moment.collectionAddress,
            tokenId: moment.tokenId,
            nonce: parent.nonce,
          };
        }

        const headers = await getAuthHeaders();
        await createCommentApi({
          moment,
          text: trimmed,
          replyTo,
          headers,
        });

        const optimistic: MintComment = {
          id: `optimistic-${Date.now()}`,
          username: username || "",
          sender: primaryWallet,
          comment: trimmed,
          timestamp: Date.now(),
          commentId: null,
          replyToId: parent?.commentId ?? null,
          nonce: null,
          replyCount: 0,
          replies: [],
        };

        if (parent?.commentId) {
          addReply(parent.commentId, optimistic);
        } else {
          addComment(optimistic);
        }

        toast.success(parent ? "reply posted" : "comment posted");
        return true;
      } catch (error: any) {
        toast.error(error?.message || "Failed to post comment");
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [addComment, addReply, getAuthHeaders, isPrepared, moment, primaryWallet, username]
  );

  return { submitComment, isSubmitting };
};

export default useCreateMomentComment;
