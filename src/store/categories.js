export default {
  state: {
    categories: [],
  },
  getters: {},
  mutations: {
    updateCategoies(state, value) {
      if (value.length) state.categories = [...value];
    },
  },
  actions: {
    async getCategories(context, { sity_id }) {
      if (!sity_id) sity_id = 1;
      const res = await fetch(
        `https://nlstar.com/ru/api/catalog3/v1/menutags/?sity_id=${sity_id}`
      );
      const json = await res.json();

      context.commit("updateCategoies", json.tags);
    },
  },
};
