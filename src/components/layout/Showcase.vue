<template>
  <v-app>
    <commodity-set/>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import CommoditySet from "@/components/features/showcase/CommoditySet.vue"

@Component({
  components: {
    CommoditySet
  }
})
export default class Showcase extends Vue {
  //prop value
  //data value
}

</script>

<style>

</style>