import { login } from "apis/auth";
import { setToken } from "boot/axios";

export default {
  namespaced: true,
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    SET_USER(state, user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      setToken(user.token);
      state.user = user;
    },
    LOGOUT() {
      sessionStorage.removeItem("user");
      location.reload();
    },
  },
  actions: {
    authenticate({ commit }, credentials) {
      return login(credentials).then((user) => {
        commit("SET_USER", user);
      });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
  },
  state: () => ({
    user: null,
  }),
};
