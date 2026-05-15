"use client";

import { Label } from "@/components/ui/label";
import { CollectionItem } from "@/types/collections";
import CollectionsDropdown from "./CollectionsDropdown";

interface CollectionsProps {
  onCreateNew?: () => void;
  onSelect?: (collection: CollectionItem) => void;
}

const Collections = ({ onCreateNew, onSelect }: CollectionsProps) => (
  <div className="flex w-full flex-col items-start gap-2">
    <Label htmlFor="collection" className="text-md font-archivo">
      collection
    </Label>
    <CollectionsDropdown onCreateNew={onCreateNew} onSelect={onSelect} />
  </div>
);

export default Collections;
