import categories from './../data/categories.json';
import order from './../data/orders.json';
import products from './../data/products.json';

categories.forEach((item) => {
  item._id = item._id.$oid;
});

products.forEach((item) => {
  item._id = item._id.$oid;
  item.photo = item.photo.data.$binary.base64;
  const category = categories.find((c) => c._id === item.category.$oid) || {};
  item.category = { _id: category._id, name: category.name };
  item.createdAt = item.createdAt.$date;
});

export { categories, order, products };
