<template>
  <div
    :style="styles"
    :class="classes"
    class="v-offset"
  >
    <slot/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class HelperOffset extends Vue {
  @Prop({
    type: Boolean,
    default: false
  })
  fullWidth!: boolean
  @Prop({
    type: [Number, String],
    default: 0
  })
  offset!: number | string

  classes() {
    return {
      "v-offset--full-width": this.fullWidth
    }
  }
  styles() {
    return {
      top: `-${this.offset}px`,
      marginBottom: `-${tis.offset}px`
    }
  }

  computed() {
    this.classes()
    this.styles()
  }
}
</script>

<style>
  .v-offset {
    margin: 0 auto;
    max-width: calc(100% - 32px);
    position: relative;
  }
  .v-offset--full-width {
    max-width: 100%;
  }
</style>