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
    async getProducts(context, { id }) {
      const res = await fetch(
        `https://nlstar.com/api/catalog3/v1/city/?id=${id}`
      );
      const json = await res.json();

      context.commit("products", json.data);
    },
  },
};
