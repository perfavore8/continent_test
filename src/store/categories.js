export default {
  state: {
    categories: [],
    selectedCategory: {},
  },
  getters: {},
  mutations: {
    updateCategoies(state, value) {
      if (value.length) state.categories = [...value];
    },
    updateSelectedCategory(state, value) {
      state.selectedCategory = { ...value };
      localStorage.setItem(
        "selectedCategory",
        JSON.stringify(state.selectedCategory)
      );
    },
  },
  actions: {
    async getCategories(context, { city_id }) {
      const res = await fetch(
        `https://nlstar.com/ru/api/catalog3/v1/menutags/?city_id=${city_id}`
      );
      const json = await res.json();

      context.commit("updateCategoies", json.tags);
    },
  },
};
