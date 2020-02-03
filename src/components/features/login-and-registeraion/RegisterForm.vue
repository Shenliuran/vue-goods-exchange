<template>
  <v-card
    raised
    loading="info"
    elevation="24"
  >
    <v-card-title>
      <v-icon>{{uss.registering.icon}}</v-icon>
      <v-spacer/>
      <h3>{{uss.registering.text}}</h3>
      <v-spacer/>
      <!--back button, return alert-message-->
      <v-btn
        icon
        @click="back"
      >
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-card-title>
    <!--register form-->
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="mdi-account"
          type="text"
          label="name"
          name="name"
          v-model="username"
        />
        <v-text-field
          prepend-icon="mdi-lock-question"
          type="text"
          label="password"
          name="password"
          v-model="password"
        />
        <v-text-field
          prepend-icon="mdi-lock"
          type="text"
          label="confirm password"
          name="confirm password"
          v-model="confirmPassword"
        />
      </v-form>
    </v-card-text>
    <!--register button-->
    <v-card-actions>
      <v-btn
        @click="onRegisterClick"
      >
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Emit, Component, Prop } from "vue-property-decorator";
import USS from "@/global/user-status-sequence";
import { USER_STATUS } from "@/global/constants"

@Component
export default class RegisterForm extends Vue {
  //data values
  uss: object = USS
  US: object = USER_STATUS
  username!: string
  password!: string
  confirmPassword!: string

  //click event
  onRegisterClick() {
    this.$store.commit("setUsername", this.username)
    this.$store.commit("setPassword", this.password)
  }
  @Emit("registeringBackListener")
  back() {}
}
</script>

<style>

</style>