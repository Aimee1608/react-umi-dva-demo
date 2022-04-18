import axios from './../utils/request';

export default {
  namespace: 'product',
  state: {
    createdAt: {
      loaded: false,
      success: false,
      products: [],
    },
    sold: {
      loaded: false,
      success: false,
      products: [],
    },
    search: [],
    filter: {
      success: false,
      loaded: false,
      result: {
        size: 0,
        data: [],
      },
    },
    product: {
      loaded: false,
      success: false,
      result: {
        _id: '',
        name: '',
        price: 0,
        description: '',
        category: {
          _id: '',
          name: '',
        },
        quantity: 0,
        sold: 0,
        photo: new FormData(),
        shipping: false,
        createdAt: '',
      },
    },
  },
  effects: {
    *searchProduct({ payload: { search, category }, callback }, { put, call }) {
      let response = yield axios.get(`/products/search`, {
        params: { search, category },
      });
      yield put({
        type: 'searchProductSuccess',
        payload: response.data,
      });
    },
    *getProduct(
      {
        payload: { sortBy = 'createdAt', order = 'desc', limit = 10 },
        callback,
      },
      { put, call },
    ) {
      let response = yield axios.get(`/products`, {
        params: { sortBy, order, limit },
      });
      yield put({
        type: 'getProductSuccess',
        payload: {
          products: response.data,
          sortBy,
        },
      });
    },
    *getProductById({ payload }, { put }) {
      let response = yield axios.get(`/product?id=${payload.productId}`);
      yield put({
        type: 'getProductByIdSuccess',
        payload: response.data,
      });
    },
    *filterProduct({ payload }, { put }) {
      console.log('payload---->filterProduct', payload);
      let response = yield axios.post(`/products/filter`, payload);
      yield put({
        type: 'filterProductSuccess',
        payload: {
          filter: payload.filter,
          data: response.data,
          size: response.data.length,
          skip: payload.skip,
        },
      });
    },
  },
  reducers: {
    searchProductSuccess(state, { payload }: { payload: any }): any {
      return {
        ...state,
        search: payload,
      };
    },
    getProductSuccess(state, { payload }: { payload: any }): any {
      return {
        ...state,
        [payload.sortBy]: {
          loaded: true,
          success: true,
          products: payload.products,
        },
      };
    },
    getProductByIdSuccess(state, { payload }: { payload: any }): any {
      return {
        ...state,
        product: {
          loaded: true,
          success: true,
          result: payload,
        },
      };
    },
    filterProductSuccess(state, { payload }: { payload: any }): any {
      let data =
        payload.skip === 0
          ? payload.data
          : [...state.filter.result.data, ...payload.data];
      console.log('payload.filter', payload.filter, payload.data);
      return {
        ...state,
        filter: {
          loaded: true,
          success: true,
          result: {
            size: data.length,
            data,
          },
        },
      };
    },
  },
};
