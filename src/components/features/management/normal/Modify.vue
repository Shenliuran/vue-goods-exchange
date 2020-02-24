<template>
  <v-card>
    <v-card-title>
      Modify Goods Info
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
      />
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component
export default class Modify extends Vue {
}
</script>

<style>

</style>