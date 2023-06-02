import { createStore } from "vuex";
import categories from "./categories";
import location from "./location";
import products from "./products";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { categories, location, products },
});
