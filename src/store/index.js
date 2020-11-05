import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: null,

    drawer: false,
    //  drawerを管理する宣言
    addresses: [],
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    showAddresses(state, payload) {
      state.addresses = payload;
      console.log("mutation =" + this.state.addresses);
    },
    toggleSideMenu(state) {
      state.drawer = !state.drawer;
      //値を反転する
    },
    deleteAddress(state, id) {
      const index = state.addresses.findIndex((address) => address.id === id);
      state.addresses.splice(index, 1);
    },
    updateAddress(state, { id, address }) {
      const index = state.addresses.findIndex((address) => address.id === id);
      state.addresses[index] = address;
    },
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    login() {
      const gooele_auth_privider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithRedirect(gooele_auth_privider);
    },
    logout() {
      firebase.auth().signOut();
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    async showAddresses({ commit }) {
      await axios
        .get("http://localhost:8080/")
        .then((reponse) => {
          commit("showAddresses", reponse.data);
        })
        .catch((reason) => console.log(reason));
    },
    toggleSideMenu({ commit }) {
      commit("toggleSideMenu");
      // mutationsのtoggleSideMenuを呼び出している
    },

    async addAddresses({ commit }, addresses) {
      console.log(addresses);
      await axios
        .post("http://localhost:8080/", addresses)
        .then(commit("showAddresses", addresses))
        .catch((reason) => console.log(reason));
    },
    async deleteAddress({ commit }, id) {
      console.log("deleteId =" + id);
      await axios
        .delete("http://localhost:8080/" + id)
        .then(commit("deleteAddress", id))
        .catch((reason) => console.log(reason));
    },
    async updateAddress({ commit }, { id, address }) {
      console.log("updateId = " + id);
      console.log(address);
      await axios
        .put("http://localhost:8080/" + id, address)
        .then(commit("updateAddress", { id, address }))
        .catch((reason) => console.log(reason));
    },
  },
  getters: {
    getAddressById: (state) => (id) =>
      state.addresses.find((address) => address.id === id),
    userName: (state) => (state.login_user ? state.login_user.displayName : ""),
    photoURL: (state) => (state.login_user ? state.login_user.photoURL : ""),
  },
});
