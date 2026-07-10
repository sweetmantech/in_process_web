import { TimelineMoment } from "@/types/moment";

/** Round-robins items across columns so reading left-to-right, top-to-bottom follows original order. */
export const distributeIntoColumns = (
  moments: TimelineMoment[],
  columnCount: number
): TimelineMoment[][] => {
  const columns: TimelineMoment[][] = Array.from({ length: columnCount }, () => []);
  moments.forEach((moment, index) => {
    columns[index % columnCount].push(moment);
  });
  return columns;
};
