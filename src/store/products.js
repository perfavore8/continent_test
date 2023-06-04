import axios from "axios";
export default {
  state: {
    products: [],
  },
  getters: {},
  mutations: {
    updateProducts(state, value) {
      state.products = value;
    },
  },
  actions: {
    async getProducts(context, { slug, city_id }) {
      const res = await axios.get(
        `https://nlstar.com/ru/api/catalog3/v1/menutags/${slug}/?city_id=${city_id}`
      );
      const data = await res.data;

      context.commit("updateProducts", data.products);
    },
  },
};
