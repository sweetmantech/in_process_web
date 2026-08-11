"use client";

import MomentCreateProviderWrapper from "@/providers/MomentCreateProvider/MomentCreateProviderWrapper";
import { CollectionsProvider } from "@/providers/CollectionsProvider";
import { ReactNode } from "react";
import { CreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";
import CollectionCreateProviderWrapper from "@/providers/CollectionCreateProvider/CollectionCreateProviderWrapper";
import CreateCollectionModal from "@/components/CreateForm/CreateCollectionModal";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CreateCollectionModalTriggerProvider>
      <CollectionsProvider>
        <MomentCreateProviderWrapper>
          <main className="flex w-screen grow flex-col md:min-h-0 md:overflow-hidden">
            <div className="relative mt-4 grid w-full flex-1 grid-cols-1 gap-3 px-3 md:mx-auto md:mt-0 md:flex md:min-h-0 md:max-w-[1680px] md:gap-0 md:px-0">
              {children}
            </div>
          </main>
        </MomentCreateProviderWrapper>
        <CollectionCreateProviderWrapper>
          <CreateCollectionModal />
        </CollectionCreateProviderWrapper>
      </CollectionsProvider>
    </CreateCollectionModalTriggerProvider>
  );
};

export default RootLayout;
