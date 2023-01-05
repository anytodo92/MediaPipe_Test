export const calculateProductsTotalPrice = (products) =>
  products.reduce((sum, { productPrice, qty }) => sum + productPrice * qty, 0);
