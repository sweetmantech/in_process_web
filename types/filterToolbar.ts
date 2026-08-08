export type FilterTab<T extends string = string> = {
  label: T;
  displayLabel?: string;
  count?: number;
};

export type FilterToolbarProps<T extends string> = {
  tabs: FilterTab<T>[];
  active: T;
  onChange: (value: T) => void;
};
