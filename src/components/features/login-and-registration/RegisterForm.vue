<template>
  <v-card
    raised
    loading="info"
    elevation="24"
  >
    <v-card-title>
      <v-icon>{{us.getRegistering.icon}}</v-icon>
      <v-spacer/>
      <h3>{{us.getRegistering.text}}</h3>
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
          label="用户名"
          name="用户名"
          v-model="username"
        />
        <v-text-field
          prepend-icon="mdi-lock-question"
          type="text"
          label="密码"
          name="密码"
          v-model="password"
        />
        <v-text-field
          prepend-icon="mdi-lock"
          type="text"
          label="密码"
          name="确认密码"
          v-model="confirmPassword"
        />
        <v-select
          :items="authorities"
          label="权限"
          v-model="choice"
        >
        </v-select>
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
import { getModule } from 'vuex-module-decorators';
import { ConstUserStatus } from '../../../store/modules/globalConst';
import { basicUrls } from '../../../api/urls';
import UserProfile from "@/store/modules/userProfile"
import UserStatus from "@/store/modules/userStatus";

const $us = getModule(UserStatus)
const $cus = getModule(ConstUserStatus)
const $up = getModule(UserProfile)
@Component
export default class RegisterForm extends Vue {
  //data values
  username: string = ""
  password: string = ""
  confirmPassword: string = ""
  us = $cus
  authorities = [ "normal", "administrator" ]
  choice: string = ""
  authority: number = 0

  //click event
  onRegisterClick() {
    if (this.password == "" || this.confirmPassword == "")
      alert("密码为空")
    else if (this.password != this.confirmPassword)
      alert("两次密码不匹配")
    else {
      $up.setBasicUserProfile({
        username: this.username,
        password: this.password
      })
      if (this.choice == "normal")
        this.authority = 0
      else
        this.authority = 1
      this.axios.post(basicUrls.dev + "/user/register", {
        username: this.username,
        password: this.password,
        authority: this.authority,
      }).then(response => {
        if (response.data == "1") {
          alert("注册成功")
          this.axios.get(basicUrls.dev + "/user/getUserIdByUsernameAndPassword?username=" +
            this.username + "&password=" + this.password).then(response => {
              $up.setUserId(response.data)
            })
          if (this.choice == "normal")
            $us.setStatus($cus.getNormal)
          else
            $us.setStatus($cus.getAdministrator)
          this.$router.push({
            path: "/empty"
          })
          alert($up.getUsername + " 欢迎")
        } else {
            alert("用户名已存在")
        }
      })


    }
  }
  @Emit("registeringBackListener")
  back() {}
}
</script>

<style>

</style>