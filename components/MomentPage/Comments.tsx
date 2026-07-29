import { useMomentProvider } from "@/providers/MomentProvider";
import CommentsContainer from "./CommentsContainer";
import { Skeleton } from "../ui/skeleton";
import CommentThread from "./CommentThread";
import CommentComposer from "./CommentComposer";
import FetchMore from "../FetchMore";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { Protocol } from "@/types/moment";
import { Fragment } from "react";

const Comments = () => {
  const { comments, hasMore, isLoading, fetchMore } = useMomentCommentsProvider();
  const { protocol } = useMomentProvider();
  const isInProcess = protocol === Protocol.InProcess;
  const commentsHidden = !isInProcess;

  if (commentsHidden) return <Fragment />;

  if (isLoading && comments.length === 0)
    return (
      <CommentsContainer>
        <div className="space-y-3 py-3">
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>
      </CommentsContainer>
    );

  return (
    <CommentsContainer>
      <div className="border-b border-[#EDEAE2] pb-3 pt-2">
        <CommentComposer placeholder="add a comment…" submitLabel="comment" />
      </div>

      {comments.length === 0 ? (
        <div className="py-6">
          <p className="font-archivo text-sm text-grey-moss-900">no comments yet</p>
          <p className="mt-1 font-spectral-italic text-sm tracking-tight text-[#8B8474]">
            be the first to comment
          </p>
        </div>
      ) : (
        <>
          {comments.map((comment) => (
            <CommentThread key={comment.id} comment={comment} />
          ))}
          {hasMore && <FetchMore fetchMore={() => fetchMore()} />}
        </>
      )}
    </CommentsContainer>
  );
};

export default Comments;
