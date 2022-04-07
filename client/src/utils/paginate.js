const paginate = (items, pageNumber, pageSize) => {
  return items.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export default paginate;
