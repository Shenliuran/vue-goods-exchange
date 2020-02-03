<template>
  <v-app>
    <!--test field-->
    <li v-for="(item, index) in items" v-bind:key="index">
      {{item.text}}
    </li>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component
export default class Showcase extends Vue {
  //prop value
  @Prop({
    type: String,
    required: false,
    default: "0"
  })
  status!: string
  //data value
  items = [
    { text: "text1" },
    { text: "text2" },
    { text: "text3" }
  ]
}

</script>

<style>

</style>