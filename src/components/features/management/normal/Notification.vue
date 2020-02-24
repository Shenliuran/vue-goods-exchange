<template>
  <v-card>
    <v-card-title>
      Notification
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    >
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { DataTableHeader } from 'vuetify';

@Component
export default class Notification extends Vue {
  search: string = ""
  headers: DataTableHeader[] = []
  items: {}[] = []
}
</script>

<style>

</style>