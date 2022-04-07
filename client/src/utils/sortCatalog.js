const sortCatalog = (catalogArr, sortBy, order) => {
  const result = [...catalogArr];
  if (['price', 'quantity', 'index'].includes(sortBy)) {
    return result.sort((a, b) =>
      order === 'asc'
        ? Number(a[sortBy]) - Number(b[sortBy])
        : Number(b[sortBy]) - Number(a[sortBy])
    );
  }
  return result.sort((a, b) =>
    order === 'asc'
      ? a[sortBy] > b[sortBy]
        ? 1
        : -1
      : a[sortBy] < b[sortBy]
      ? 1
      : -1
  );
};

export default sortCatalog;
