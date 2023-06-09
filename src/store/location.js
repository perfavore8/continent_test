import axios from "axios";
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
      const res = await axios.get(
        `https://nlstar.com/api/catalog3/v1/city/?id=${id}`
      );
      const data = await res.data;

      context.commit("updateLocation", data.data);
    },
    async getLocationsForChange(context, { term }) {
      const res = await axios.get(
        `https://nlstar.com/api/catalog3/v1/city/?term=${term}&country=ru`
      );
      const data = await res.data;

      return data.data;
    },
  },
};
