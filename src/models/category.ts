import axios from './../utils/request';

export default {
  namespace: 'category',
  state: {
    category: {
      loaded: false,
      success: false,
      result: [],
    },
  },
  reducers: {
    getCategory(state, { payload }: { payload: any }): any {
      return {
        ...state,
        category: {
          loaded: false,
          success: false,
          result: [],
        },
      };
    },
    getCategorySuccess(state, { payload }: { payload: any }): any {
      return {
        ...state,
        category: {
          loaded: true,
          success: true,
          result: payload,
        },
      };
    },
  },
  effects: {
    *handleGetCategory({ payload, callback }, { put, call }) {
      let response = yield axios.get(`/categories`);
      yield put({
        type: 'getCategorySuccess',
        payload: response.data,
      });
    },
  },
};
