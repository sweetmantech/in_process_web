"use client";

import { ReactNode } from "react";
import { CollectionsProvider } from "@/providers/CollectionsProvider";
import { CreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";
import CollectionCreateProviderWrapper from "@/providers/CollectionCreateProvider/CollectionCreateProviderWrapper";
import CreateCollectionModal from "@/components/CreateForm/CreateCollectionModal";
import NounsCreateProviderWrapper from "@/providers/NounsCreateProvider/NounsCreateProviderWrapper";

const NounsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CreateCollectionModalTriggerProvider>
      <CollectionsProvider>
        <NounsCreateProviderWrapper>
          <main className="w-screen grow">
            <div className="relative mt-12 grid w-full grid-cols-1 gap-6 px-6 md:mt-24 md:grid-cols-3 md:px-10">
              {children}
            </div>
          </main>
        </NounsCreateProviderWrapper>
        <CollectionCreateProviderWrapper>
          <CreateCollectionModal />
        </CollectionCreateProviderWrapper>
      </CollectionsProvider>
    </CreateCollectionModalTriggerProvider>
  );
};

export default NounsLayout;
