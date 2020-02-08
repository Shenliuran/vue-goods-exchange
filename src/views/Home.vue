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
  <showcase/>
</v-app>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Inject, Provide } from 'vue-property-decorator';
import AppTitleBar from '@/components/layout/AppTitleBar.vue'
import Showcase from '@/components/layout/Showcase.vue'
import { USER_STATUS } from '../global/constants';

@Component({
  components: {
    AppTitleBar,
    Showcase
  }
})
export default class Home extends Vue {
}

</script>

<style>

</style>