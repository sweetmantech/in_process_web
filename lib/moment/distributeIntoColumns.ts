/** Round-robins items across columns so reading left-to-right, top-to-bottom follows original order. */
export const distributeIntoColumns = <T>(items: T[], columnCount: number): T[][] => {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });
  return columns;
};
