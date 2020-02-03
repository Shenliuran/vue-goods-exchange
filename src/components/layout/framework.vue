<template>
<v-app>
  <!--app title bar
    including: 
      navigation drawer,
      search bar,
      backstage center,
      message bell
  -->
  <app-title-bar/>
  <v-container><v-spacer/></v-container>
  <!--show case
    display goods
  -->
  <showcase
  />
</v-app>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import AppTitleBar from './AppTitleBar.vue'
import Showcase from './Showcase.vue'

@Component({
  components: {
    AppTitleBar,
    Showcase
  }
})
export default class Framework extends Vue {
}
</script>

<style>

</style>