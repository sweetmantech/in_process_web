import { ReactNode } from "react";

const CommentsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-0 flex-col overflow-hidden px-[18px] pb-3.5 pt-1 md:max-h-[calc(100dvh-8rem)]">
      {children}
    </div>
  );
};

export default CommentsContainer;
