"use client";

import { useState, Fragment } from "react";
import CollectionOverview from "../Overview/CollectionOverview";
import { useParams } from "next/navigation";
import { MetadataFormProvider } from "@/providers/MetadataFormProvider";
import CollectionMedia from "../Media/CollectionMedia";
import { MetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import Tabs, { COLLECTION_MANAGE_TABS } from "./Tabs";
import Admins from "./Admins";
import MomentsTab from "./MomentsTab";

const CollectionManagePage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(COLLECTION_MANAGE_TABS.MEDIA);
  const params = useParams();
  const collection = params.collection as string;

  if (!collection) return <Fragment />;

  return (
    <MetadataFormProvider>
      <MetadataUploadProvider>
        <CollectionOverview />
        <Tabs selectedTab={selectedTab} onChangeTab={(value: number) => setSelectedTab(value)} />
        <div className="pb-2">
          {selectedTab === COLLECTION_MANAGE_TABS.MEDIA && <CollectionMedia />}
          {selectedTab === COLLECTION_MANAGE_TABS.ADMINS && <Admins />}
          {selectedTab === COLLECTION_MANAGE_TABS.MOMENTS && <MomentsTab collection={collection} />}
        </div>
      </MetadataUploadProvider>
    </MetadataFormProvider>
  );
};

export default CollectionManagePage;
