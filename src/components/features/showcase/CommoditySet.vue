<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        md12
        sm12
        lg4
      >
      <commodity-card class="commodity-area"></commodity-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CommodityCard from "./CommodityCard.vue"

@Component({
  components: {
    CommodityCard
  }
})
export default class CommoditySet extends Vue {
}
</script>

<style>
  .commodity-area {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }
</style>