import { useState } from "react";
import { useParams } from "next/navigation";
import { COLLECTION_MANAGE_TABS } from "@/components/CollectionManagePage/Tabs";

const useCollectionManageTabs = () => {
  const [selectedTab, setSelectedTab] = useState<number>(COLLECTION_MANAGE_TABS.MEDIA);
  const [hasVisitedMoments, setHasVisitedMoments] = useState(
    () => selectedTab === COLLECTION_MANAGE_TABS.MOMENTS
  );
  const params = useParams();
  const collection = params.collection as string;

  const handleChangeTab = (value: number) => {
    setSelectedTab(value);
    if (value === COLLECTION_MANAGE_TABS.MOMENTS) setHasVisitedMoments(true);
  };

  return {
    selectedTab,
    hasVisitedMoments,
    handleChangeTab,
    collection,
  };
};

export default useCollectionManageTabs;
