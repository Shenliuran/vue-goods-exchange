<template>
  <v-app>
    <v-dialog
      v-model="isBackstageClicked"
      :clipped="$vuetify.breakpoint.lgAndUp"
      persistent
      max-width="300"
    >
      <v-card
        raised
        loading="warning"
        elevation="24"
        v-if="status == us.getIsNotLogin.text"
      >
        <v-card-title>
          <h3>{{us.getIsNotLogin.text}}</h3>
          <v-spacer/>
          <!--close event, return home page-->
          <v-btn
            icon
            @click="close"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
          <span>您还没还有登录</span>
          <v-icon>{{us.getIsNotLogin.icon}}</v-icon>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <!--log event-->
          <v-btn
            @click="logging"
          >
            登录
          </v-btn>
          <!-- register evnet-->
          <v-btn
            to="/"
          >
            注册
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
      <!--logging panel-->
      <login-form
        v-else-if="status == us.getLogging.text"
        @loggingBackListener="status = us.getIsNotLogin.text"
      />
      <!--registering panel-->
      <register-form
        v-else-if="status == us.getRegistering.text"
        @registeringBackListener="status = us.getIsNotLogin.text"
      />
    </v-dialog>
  </v-app>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import LoginForm from "./LoginForm.vue"
import RegisterForm from "./RegisterForm.vue"
import { getModule } from 'vuex-module-decorators';
import { ConstUserStatus, Prototype } from '../../../store/modules/globalConst';

const $cus = getModule(ConstUserStatus)
@Component({
  components: {
    LoginForm,
    RegisterForm
  }
})
export default class AlertMessage extends Vue {
  //props values
  @Prop({
    type: Boolean,
    required: false
  })
  isBackstageClicked!: boolean //father component's value

  //data values
  status: string = $cus.getIsNotLogin.text// local current user status
  username!: string //user name cache
  password!: string //user password cache
  us = $cus

  //click event
  /**
   * alert-message quit event
   */
  @Emit("alertMessageQuitListener")
  close() {}
  /**
   * user information transimition event
   * @param username
   * @param password
   */
  /**
   * click login button event
   */
  logging() {
    this.status = $cus.getLogging.text
  }
  /**
   * click register button event
   */
  registering() {
    this.status = $cus.getRegistering.text
  }
}
</script>

<style>
  .notices {
    width: 50%;
    align-content: center;
    text-align: center;
    margin: 0 auto;
    top: 30%;
    position: relative;
  }
</style>