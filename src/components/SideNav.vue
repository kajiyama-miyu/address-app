<template>
  <!-- ボタンを使う時に使用。drawerの値を反転させる。 -->
  <v-navigation-drawer v-model="$store.state.drawer" absolute temporary>
    <!-- サイドメニューなどのナビゲーションを表示するといに使用。真偽値で表示非表示を切り替えられる。(v-modeで切り替え） -->
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <img v-if="photoURL" :src="photoURL" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ userName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: "ホーム", icon: "mdi-home", link: { name: "home" } },
        { title: "連絡先一覧", icon: "mdi-menu", link: { name: "addresses" } },
      ],
    };
  },
  computed: {
    ...mapGetters(["userName", "photoURL"]),
  },
};
</script>