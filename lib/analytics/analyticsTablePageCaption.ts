const analyticsTablePageCaption = (rowCount: number, currentPage: number, limit: number) => {
  const totalPages = Math.max(1, Math.ceil(rowCount / limit));
  return `${rowCount} rows · page ${currentPage} of ${totalPages}`;
};

export default analyticsTablePageCaption;
