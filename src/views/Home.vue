<template>
  <div class="home">
    <frame-work/>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// @ is an alias to /src
import FrameWork from '@/components/layout/Framework.vue'

export default {
  name: 'home',
  components: {
    FrameWork
  }
}
</script>
