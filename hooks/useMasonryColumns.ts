import { useMasonryColumnCount } from "@/hooks/useMasonryColumnCount";
import useViewport from "@/hooks/useViewport";
import { distributeIntoColumns } from "@/lib/moment/distributeIntoColumns";
import { getPreMountColumns } from "@/lib/masonry/getPreMountColumns";

export const useMasonryColumns = <T>(items: T[]) => {
  const columnCount = useMasonryColumnCount();
  const isPreMount = useViewport() === undefined;
  const columns = isPreMount
    ? getPreMountColumns(items)
    : distributeIntoColumns(items, columnCount);

  return { columns, isPreMount };
};
