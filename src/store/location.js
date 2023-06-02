export default {
  state: {
    location: {},
  },
  getters: {},
  mutations: {
    updateLocation(state, value) {
      state.location = value;
      localStorage.setItem("location", JSON.stringify(state.location));
    },
  },
  actions: {
    async getLocation(context, { id }) {
      const res = await fetch(
        `https://nlstar.com/api/catalog3/v1/city/?id=${id}`
      );
      const json = await res.json();

      context.commit("updateLocation", json.data);
    },
    async getLocationsForChange(context, { term }) {
      const res = await fetch(
        `https://nlstar.com/api/catalog3/v1/city/?term=${term}&country=ru`
      );
      const json = await res.json();

      return json.data;
    },
  },
};
