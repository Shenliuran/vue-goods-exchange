<template>
  <v-app>
    <!-- <home/> -->
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
// import Home from './views/Home.vue'

export default Vue.extend({
  name: 'App',

  components: {
    // Home
  },

  data: () => ({
    //
  }),
});
</script>
