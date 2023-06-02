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
      const res = await fetch(
        `https://nlstar.com/ru/api/catalog3/v1/menutags/${slug}/?city_id=${city_id}`
      );
      const json = await res.json();

      context.commit("updateProducts", json.products);
    },
  },
};
