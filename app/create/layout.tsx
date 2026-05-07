"use client";

import MomentCreateProviderWrapper from "@/providers/MomentCreateProvider/MomentCreateProviderWrapper";
import { CollectionsProvider } from "@/providers/CollectionsProvider";
import { ReactNode } from "react";
import { CreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";
import CollectionCreateProviderWrapper from "@/providers/CollectionCreateProvider/CollectionCreateProviderWrapper";
import CreateCollectionModal from "@/components/CreateForm/CreateCollectionModal";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}>
      <CreateCollectionModalTriggerProvider>
        <CollectionsProvider>
          <MomentCreateProviderWrapper>
            <main className="w-screen grow">
              <div className="relative mt-12 grid w-full grid-cols-1 gap-6 px-6 md:mt-24 md:grid-cols-3 md:px-10">
                {children}
              </div>
            </main>
          </MomentCreateProviderWrapper>
          <CollectionCreateProviderWrapper>
            <CreateCollectionModal />
          </CollectionCreateProviderWrapper>
        </CollectionsProvider>
      </CreateCollectionModalTriggerProvider>
    </GoogleReCaptchaProvider>
  );
};

export default RootLayout;
