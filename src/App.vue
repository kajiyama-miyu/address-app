<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
      <!-- Storeの中に書いたtoggleSideMenuを呼び出している -->
      <v-toolbar-title>>マイアドレス帳</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.login_user">
        <v-btn text @click="logout">ログアウト</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <SideNav />
    <v-content>
      <v-container fluid fill-height align-start>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import SideNav from "./components/SideNav";
import firebase from "firebase";

export default {
  name: "App",

  components: {
    SideNav,
    // 使用するためにコンポーネントに追加する
  },
  data: () => ({
    //
  }),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user);
        this.showAddresses();
        if (this.$router.currentRoute.name === "home") {
          this.$router.push({ name: "addresses" }, () => {});
        }
      } else {
        this.deleteLoginUser();
        this.$router.push({ name: "home" }, () => {});
      }
    });
  },
  methods: {
    ...mapActions([
      "toggleSideMenu",
      "setLoginUser",
      "logout",
      "deleteLoginUser",
      "showAddresses",
    ]),
  },
};
</script>
