<template>
  <div class="home">
    <!--main framework
      including:
        app-title-bar
        showcase
      submit data via v-bind
    -->
    <framework/>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Framework from '@/components/layout/Framework.vue'
import { Vue, Emit, Component, Prop } from "vue-property-decorator"

@Component({
  components: {
    Framework
  }
})
export default class Home extends Vue {
}
</script>
