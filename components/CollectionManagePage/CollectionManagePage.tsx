"use client";

import { Fragment } from "react";
import CollectionOverview from "../Overview/CollectionOverview";
import { MetadataFormProvider } from "@/providers/MetadataFormProvider";
import CollectionMedia from "../Media/CollectionMedia";
import { MetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import Tabs, { COLLECTION_MANAGE_TABS } from "./Tabs";
import Admins from "./Admins";
import MomentsTab from "./MomentsTab";
import useCollectionManageTabs from "@/hooks/useCollectionManageTabs";

const CollectionManagePage = () => {
  const { selectedTab, hasVisitedMoments, handleChangeTab, collection } = useCollectionManageTabs();

  if (!collection) return <Fragment />;

  return (
    <MetadataFormProvider>
      <MetadataUploadProvider>
        <CollectionOverview />
        <Tabs selectedTab={selectedTab} onChangeTab={handleChangeTab} />
        <div className="pb-2">
          {selectedTab === COLLECTION_MANAGE_TABS.MEDIA && <CollectionMedia />}
          {selectedTab === COLLECTION_MANAGE_TABS.ADMINS && <Admins />}
          {hasVisitedMoments && (
            <div className={selectedTab === COLLECTION_MANAGE_TABS.MOMENTS ? "" : "hidden"}>
              <MomentsTab collection={collection} />
            </div>
          )}
        </div>
      </MetadataUploadProvider>
    </MetadataFormProvider>
  );
};

export default CollectionManagePage;
