import priceformatter from '../lib/price-formatter';

function calculateTotal(array) {
  let total = 0;
  array.forEach(item => {
    total += item.price;
  });
  return priceformatter(total);
}

export default calculateTotal;
