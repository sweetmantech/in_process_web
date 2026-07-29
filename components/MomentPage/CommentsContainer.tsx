import { ReactNode } from "react";

const CommentsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="no-scrollbar flex max-h-[360px] flex-col overflow-y-auto px-[18px] pb-3.5 pt-1">
      {children}
    </div>
  );
};

export default CommentsContainer;
