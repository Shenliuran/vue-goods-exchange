<template>
  <v-app> 
    <router-view ></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  components: {},

  created() {
    if (sessionStorage.getItem("store"))
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(String(sessionStorage.getItem("store")))
        )
      );

    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  }
});
</script>

<style lang="stylus"></style>