<template>
  <v-card
    raised
    loading="info"
    elevation="24"
  >
    <v-card-title>
      <v-icon>{{uss.logging.icon}}</v-icon>
      <v-spacer/>
      <h3>{{uss.logging.text}}</h3>
      <v-spacer/>
      <!--back button, return alert-message-->
      <v-btn
        icon
        @click="back"
      >
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-card-title>
    <!--login form-->
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="mdi-account"
          type="text"
          label="name"
          name="name"
          v-model="name"
        />
        <v-text-field
          prepend-icon="mdi-lock"
          type="text"
          label="password"
          name="password"
          v-model="password"
        />
      </v-form>
    </v-card-text>
    <!--login button-->
    <v-card-actions>
      <v-btn
        @click="onLoginClick"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Emit, Component, Prop } from "vue-property-decorator";
import USS from "@/global/user-status-sequence";
import { USER_STATUS } from "@/global/constants"

@Component
export default class LoginForm extends Vue{
  //data values
  uss: object = USS
  US: object = USER_STATUS
  name: string = "" // the input value of name
  password: string = "" // the input value of password
  // testfield: string = this.$route.params.username // the temparory test field via route
  //click event
  /**
   * click login event
   */
  onLoginClick() {
    this.submitUserInfo(this.name, this.password)
    this.$router.push({
      name: "normal-user",
      params: {
        username: this.name,
        password: this.password
      }
    })
  }
  /**
   * click back button event
   */
  @Emit("loggingBackListener")
  back() {}
  /**
   * submit the user login informantion to backstage center
   * @param username
   * @param password
   */
  @Emit("userInfoForwardListener")
  submitUserInfo(username: string, password: string) {}
  /**
   * submit current user status
   */
  @Emit("userStatusForwardListener")
  submitUserStatus(userStatus: number) {}
}
</script>

<style>

</style>