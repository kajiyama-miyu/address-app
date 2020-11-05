<template>
  <v-container>
    <v-layout>
      <v-flex xs12 mt-5>
        <v-btn color="info" @click="login">Googleアカウントでログイン</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
// @ is an alias to /src

export default {
  name: "Home",

  methods: {
    ...mapActions(["login"]),
  },
};
</script>
