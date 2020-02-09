<template>
<v-app>
  <!--framework
    including: 
      navigation drawer,
      search bar,
      backstage center,
      message bell
      showcase
  -->
  <frame-work/>
</v-app>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Inject, Provide } from 'vue-property-decorator';
import FrameWork from '@/components/layout/FrameWork.vue'
import { USER_STATUS } from '../global/constants';

@Component({
  components: {
    FrameWork,
  }
})
export default class Home extends Vue {
}

</script>

<style>

</style>