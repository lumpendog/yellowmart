const formatPrice = (price) => {
  let result = String(price);
  if (result.length > 3) {
    result = '$' + result.slice(0, -3) + ',' + result.slice(-3);
  } else {
    result = '$' + result;
  }
  return result;
};

export default formatPrice;
