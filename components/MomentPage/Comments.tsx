import { useMomentProvider } from "@/providers/MomentProvider";
import CommentsContainer from "./CommentsContainer";
import { Skeleton } from "../ui/skeleton";
import { Comment } from "./Comment";
import FetchMore from "../FetchMore";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { Protocol } from "@/types/moment";
import { Fragment } from "react";

const Comments = () => {
  const { comments, hasMore, isLoading, fetchMore } = useMomentCommentsProvider();
  const { isSetSale, protocol } = useMomentProvider();
  const isInProcess = protocol === Protocol.InProcess;
  const commentsHidden = !isInProcess;

  if (commentsHidden) return <Fragment />;

  if (isLoading)
    return (
      <CommentsContainer>
        <Skeleton className="my-4 h-20 w-full rounded-lg" />
        <Skeleton className="mb-4 h-20 w-full rounded-lg" />
      </CommentsContainer>
    );

  if (comments.length === 0)
    return (
      <CommentsContainer>
        <div className="py-6">
          <p className="font-archivo text-sm text-grey-moss-900">no comments yet</p>
          <p className="mt-1 font-spectral-italic text-sm tracking-tight text-[#8B8474]">
            {isSetSale ? "collect and be first" : "sale is not yet activated."}
          </p>
        </div>
      </CommentsContainer>
    );

  return (
    <CommentsContainer>
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
      {hasMore && <FetchMore fetchMore={() => fetchMore()} />}
    </CommentsContainer>
  );
};

export default Comments;
