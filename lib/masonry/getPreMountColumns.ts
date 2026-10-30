import { PRE_MOUNT_COLUMN_LIMIT } from "@/lib/masonry/preMountColumns";

export const getPreMountColumns = <T>(items: T[]): T[][] =>
  items.slice(0, PRE_MOUNT_COLUMN_LIMIT).map((item) => [item]);
