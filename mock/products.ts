import mockjs from 'mockjs';
import { products } from './../data';

// console.log('products', products)
function getProducts(req, res) {
  const { sortBy, order, limit } = req.query;
  let result = products.slice();
  if (sortBy === 'createdAt') {
    result = result.sort((a, b) => {
      const aT = new Date(a.createdAt).getTime();
      const bT = new Date(b.createdAt).getTime();
      if (order === 'desc') {
        return bT - aT;
      } else {
        return aT - bT;
      }
    });
  } else if (sortBy === 'sold') {
    result = result.sort((a, b) => {
      if (order === 'desc') {
        return b.sold - a.sold;
      } else {
        return a.sold - b.sold;
      }
    });
  }
  // console.log('getProducts---->', result)
  return res.json(mockjs.mock(result.slice(0, limit)));
}

function getProductsById(req, res) {
  const params = req.query;
  console.log(params.id);
  const result = mockjs.mock(products.find((item) => item._id === params.id));
  // console.log('result', result)
  return res.json(result);
}

function filterProducts(req, res) {
  const params = req.body;
  const {
    filter: { category = [], price = [] },
    skip,
  } = params;
  let result = products.slice();
  if (category && category.length > 0) {
    result = result.filter((item) => category.includes(item.category._id));
  }
  if (price && price.length > 0) {
    result = result.filter(
      (item) => item.price >= price[0] && item.price <= price[1],
    );
  }
  if (skip === 0) {
    result = result.slice(0, 4);
  } else {
    result = result.slice(skip, skip + 4);
  }
  console.log('result', result.length);
  return res.json(mockjs.mock(result));
}
const getSearchProducts = (req, res) => {
  const { search, category } = req.query;
  let result = products.slice();
  if (category && category != 'All') {
    result = result.filter((item) => item.category._id === category);
  }
  if (search) {
    result = result.filter((item) => {
      const s = search.toLowerCase();
      if (
        item.name.toLowerCase().indexOf(s) > -1 ||
        item.description.toLowerCase().indexOf(s) > -1
      ) {
        return true;
      }
      return false;
    });
  }
  console.log('getSearchProducts---->mock', search, category);
  return res.json(mockjs.mock(result));
};

export default {
  'GET /api/products': getProducts,
  'GET /api/product': getProductsById,
  'POST /api/products/filter': filterProducts,
  'GET /api/products/search': getSearchProducts,
};
