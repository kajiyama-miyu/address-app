import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueAxios from "vue-axios";
import axios from "axios";
import firebase from "firebase";

Vue.config.productionTip = false;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDWNvh_ZiANsE2nXWuat59Toh9gquQcQh0",
  authDomain: "my-vue-project-91865.firebaseapp.com",
  databaseURL: "https://my-vue-project-91865.firebaseio.com",
  projectId: "my-vue-project-91865",
  storageBucket: "my-vue-project-91865.appspot.com",
  messagingSenderId: "537939557192",
  appId: "1:537939557192:web:e5182a8be5a476937b917d",
  measurementId: "G-9QNFR5RJ3C",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
