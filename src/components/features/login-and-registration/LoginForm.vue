<template>
  <v-card
    raised
    loading="info"
    elevation="24"
  >
  <!--login form title-->
    <v-card-title>
      <v-icon>{{us.getLogging.icon}}</v-icon>
      <!--test field-->
      <!-- <span>{{this.$store.getters.getUsername}}</span> -->
      <v-spacer/>
      <h3>{{us.getLogging.text}}</h3>
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
      <v-spacer></v-spacer>
      <v-btn
        @click="onLoginClick"
      >
        Login
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Emit, Component, Prop } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import UserStatus from "@/store/modules/userStatus";
import UserProfile from "@/store/modules/userProfile"
import { getModule } from 'vuex-module-decorators';
import { ConstUserStatus } from "@/store/modules/globalConst"
import { basicUrls } from "@/api/urls";

const $us = getModule(UserStatus)
const $up = getModule(UserProfile)
const $cus = getModule(ConstUserStatus)
@Component
export default class LoginForm extends Vue{
  //data values
  name: string = "" // the input value of name
  password: string = "" // the input value of password
  seen: string = ""
  us = $cus
  userToken: string = ""
  authority: number = 0


  //click event
  /**
   * click login event
   */
  onLoginClick() {
    this.axios.post(basicUrls.dev + "/user/login", {
      username: this.name,
      password: this.password
    }).then(request => {
      if (request.data == '0')
        alert("用户不存在")
      else if (request.data == '1')
        alert("登陆失败，账号或密码错误")
      else {
        this.axios.get(basicUrls.dev + "/user/authority?username=" + this.name).then(req => {
          $up.setBasicUserProfile({
            username: this.name,
            password: this.password
          })
          this.axios.get(basicUrls.dev + "/user/getUserIdByUsernameAndPassword?username=" +
            this.name + "&password=" + this.password).then(r => $up.setUserId(r.data))
          if (req.data == "0")
            $us.setStatus($cus.getNormal)
          else
            $us.setStatus($cus.getAdministrator)
          this.$router.push({
            path: "/empty"
          })
          alert($up.getUsername + " 欢迎")
        })
      }
    })
  }

  /**
   * click back button event
   */
  @Emit("loggingBackListener")
  back() {}
}
</script>

<style>

</style>