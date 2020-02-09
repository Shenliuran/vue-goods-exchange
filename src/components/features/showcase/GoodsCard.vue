<template>
  <v-app>
    <v-card
      v-bind="$attrs"
      :style="styles"
      v-on="$listeners"
    >
      <helper-offset
        v-if="hasOffset"
        :inline="inline"
        :full-width="fullWidth"
        :offset="offset"
      >
        <v-card
          v-if="!$slots.offset"
          :color="color"
          :class="`elevation-${elevation}`"
          class="v-card--goods__header"
        >
        <slot
          v-if="!title && !text"
          name="header"
        />
        <span v-else>
          <h4
            class="title font-weight-light mb-2"
            v-text="title"
          />
          <p
            class="categroy font-weight-thin"
            v-text="text"
          />
        </span>
      </v-card>
      <slot
        v-else
        name="offset"
      >
    </helper-offset>
    <v-card-text>
      <slot/>
    </v-card-text>
    <v-divider
      v-if="$slots.actions"
      class="mx-3"
    >
    <v-card-actions>
      <slot name="actions"/>
    </v-card-actions>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import HeplerOffset from "./HeplerOffset.vue";

@Component({
  inheritAttrs: false
})
export default class GoodsCard extends Vue {
  @Prop({
    type: String,
    default: "secondary"
  })
  color!: String
  @Prop({
    type: [Number, String],
    default: 10
  })
  elevation!: number | string
  @Prop({
    type: Boolean,
    default: false
  })
  inline!: boolean
  @Prop({
    type: Boolean,
    default: false
  })
  fullWidth!: boolean
  @Prop({
    type: [Number, String],
    default: 24
  })
  offset!: number | string
  @Prop({
    type: String,
    default: undefined
  })
  title!: string
  @Prop({
    type: String,
    default: undefined
  })
  text!: string
}
</script>

<style>

</style>