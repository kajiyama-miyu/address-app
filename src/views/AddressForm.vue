<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>連絡先編集</h1>
      </v-flex>

      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form ref="address">
              <v-text-field
                v-model="address.name"
                label="名前"
                :rules="[required_name]"
              ></v-text-field>
              <v-text-field
                v-model="address.telephone"
                label="電話番号"
                :rules="[required_tel]"
              ></v-text-field>
              <v-text-field
                v-model="address.email"
                label="メールアドレス"
                :rules="[required_email]"
              ></v-text-field>
              <v-text-field
                v-model="address.address"
                label="住所"
                :rules="[required_address]"
              ></v-text-field>
              <div class="text-center">
                <v-btn @click="$router.push({ name: 'addresses' })"
                  >キャンセル</v-btn
                >
                <v-btn color="info" class="ml-2" @click="submit">保存</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  created() {
    const address = this.$store.getters.getAddressById(
      this.$route.params.address_id,
      console.log("getAddressById =" + this.address),
      console.log(
        "this.$route.params.address_id =" + this.$route.params.address_id
      )
    );
    if (address) {
      this.address = address;
    }
  },
  data() {
    return {
      address: {
        name: undefined,
        telephone: undefined,
        email: undefined,
        address: undefined,
      },
      required_name: (value) => !!value || "名前を入力してください",
      required_tel: (value) => !!value || "電話番号を入力してください",
      required_email: (value) => !!value || "メールアドレスを入力してください",
      required_address: (value) => !!value || "住所を入力してください",
    };
  },
  methods: {
    async submit() {
      if (this.$refs.address.validate()) {
        if (this.$route.params.address_id) {
          this.updateAddress({
            id: this.$route.params.address_id,
            address: this.address,
          });
        } else {
          console.log("addAddress = " + this.address.name);
          await this.addAddresses(this.address);
        }

        this.$router.push({ name: "addresses" });
        this.address = {};
      }
    },

    ...mapActions(["addAddresses", "updateAddress"]),
    // // メソッドを実行する
  },
};
</script>