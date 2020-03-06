<template>
  <v-app>
    <goods-set/>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import GoodsSet from "@/components/features/showcase/GoodsSet.vue"

@Component({
  components: {
    GoodsSet
  }
})
export default class Showcase extends Vue {
  //prop value
  //data value
}

</script>

<style>

</style>