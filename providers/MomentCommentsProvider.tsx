import { useComments } from "@/hooks/useComments";
import useWriteComment from "@/hooks/useWriteComment";
import useCreateMomentComment from "@/hooks/useCreateMomentComment";
import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

type MomentCommentsContextValue = ReturnType<typeof useWriteComment> &
  ReturnType<typeof useComments> &
  ReturnType<typeof useCreateMomentComment> & {
    isOpenCommentModal: boolean;
    setIsOpenCommentModal: Dispatch<SetStateAction<boolean>>;
  };

const MomentCommentsContext = createContext<MomentCommentsContextValue | undefined>(undefined);

export function MomentCommentsProvider({ children }: { children: ReactNode }) {
  const writeComment = useWriteComment();
  const comments = useComments();
  const createComment = useCreateMomentComment({
    addComment: comments.addComment,
    addReply: comments.addReply,
  });
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);

  return (
    <MomentCommentsContext.Provider
      value={{
        ...comments,
        ...writeComment,
        ...createComment,
        isOpenCommentModal,
        setIsOpenCommentModal,
      }}
    >
      {children}
    </MomentCommentsContext.Provider>
  );
}

export function useMomentCommentsProvider() {
  const context = useContext(MomentCommentsContext);
  if (context === undefined) {
    throw new Error("useMomentCommentsProvider must be used within a MomentCommentsProvider");
  }
  return context;
}
