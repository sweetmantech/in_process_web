"use client";

import { CollectionItem } from "@/types/collections";
import CollectionsDropdown from "./CollectionsDropdown";

interface CollectionsProps {
  onCreateNew?: () => void;
  onSelect?: (collection: CollectionItem) => void;
  disabled?: boolean;
}

const Collections = ({ onCreateNew, onSelect, disabled }: CollectionsProps) => (
  <div className="flex w-full flex-col items-start">
    <label
      htmlFor="collection"
      className="mb-1 font-archivo-medium text-[10.5px] uppercase tracking-[0.14em] text-[#A8A296]"
    >
      collection
    </label>
    <CollectionsDropdown onCreateNew={onCreateNew} onSelect={onSelect} disabled={disabled} />
  </div>
);

export default Collections;
