<template>
  <app-title-bar/>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import AppTitleBar from './AppTitleBar.vue'

@Component({
  components: {
    AppTitleBar
  }
})
export default class FrameWork extends Vue {
}
</script>

<style>

</style>