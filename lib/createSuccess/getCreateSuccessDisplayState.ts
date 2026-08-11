import { MomentMetadata } from "@/types/moment";

interface GetCreateSuccessDisplayStateParams {
  momentMetadata: MomentMetadata | null;
  formName: string;
  formDescription: string;
  collectionName?: string;
  price: string;
  priceUnit: string;
  activeTokenId?: string;
  timestamp: string;
  descExpanded: boolean;
}

const DESCRIPTION_PREVIEW_LIMIT = 160;

const getCreateSuccessDisplayState = ({
  momentMetadata,
  formName,
  formDescription,
  collectionName,
  price,
  priceUnit,
  activeTokenId,
  timestamp,
  descExpanded,
}: GetCreateSuccessDisplayStateParams) => {
  const displayedName = momentMetadata?.name?.trim() || formName.trim() || "Untitled moment";
  const displayedDescriptionSource =
    momentMetadata?.description?.trim() || formDescription.trim() || "";
  const showDescriptionToggle = displayedDescriptionSource.length > DESCRIPTION_PREVIEW_LIMIT;
  const displayedDescription = descExpanded
    ? displayedDescriptionSource
    : displayedDescriptionSource.slice(0, DESCRIPTION_PREVIEW_LIMIT).trimEnd();

  return {
    displayedName,
    displayedDescriptionSource,
    showDescriptionToggle,
    displayedDescription,
    displayedPrice: activeTokenId ? `${price} ${priceUnit.toUpperCase()}` : "--",
    displayedTimestamp: activeTokenId ? timestamp : "Created just now",
    shareTitle: displayedName || collectionName || "moment",
    isThoughtMoment: momentMetadata?.content?.mime?.startsWith("text/plain"),
  };
};

export default getCreateSuccessDisplayState;
