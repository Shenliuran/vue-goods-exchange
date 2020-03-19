<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class EmptyHome extends Vue {
  created() {
    this.$router.push({
      path: "/home"
    })
  }
}
</script>

<style>
</style>