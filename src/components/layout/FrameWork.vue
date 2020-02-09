<template>
  <v-app>
    <!--homepage naviagtion drawer-->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      temporary
      app
      overflow
    >
      <v-btn></v-btn>
    </v-navigation-drawer>
    <!--homepage title drawer-->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      right
    >
      <v-app-bar-nav-icon
        @click.stop="drawer != drawer"
      />
      <v-toolbar-title
        style="width: 100%"
        class="ml-0 pl-4"
      >
        <span>Goods Exchange</span>
      </v-toolbar-title>
      <!--homepage search bar-->
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        style="width: 200%;"
      />
      <v-container>
        <v-spacer/>
      </v-container>
      <!--backstage center button-->
      <v-btn
        icon
        large
        @click="onBackstageClick"
      >
        <v-icon>mdi-contacts</v-icon>
      </v-btn>
      <!--message bell button-->
      <!--call message bell-->
      <message-bell/>
      <!--call dialog message:you haven't logged-->
      <alert-message
        v-if="usrStatus == US.IS_NOT_LOGIN"
        v-bind:isBackstageClicked="isBackstageClicked"
        @alertMessageQuitListener="alertMessageQuit"
      />
      <!--call backstage center-->
    </v-app-bar>
    <!--placeholder-->
    <v-app-bar/>
    <!--show case-->
    <showcase/>
  </v-app>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import AlertMessage from "@/components/features/login-and-registeraion/AlertMessage.vue"
import UserStatusSequence from "@/global/user-status-sequence";
import MessageBell from "@/components/features/notification/MessageBell.vue"
import { USER_STATUS } from "@/global/constants";
import { getModule } from 'vuex-module-decorators';
import Showcase from '@/components/layout/Showcase.vue'
import UserStatus from "@/store/modules/userstatus"

const $us = getModule(UserStatus)
@Component({
  components: {
    AlertMessage,
    MessageBell,
    Showcase
  }
})
export default class FrameWork extends Vue{
  //prop values
  //data values
  isBackstageClicked: boolean = false //whether the backstage clicked
  isMessageBellClicked: boolean = false //whether the message bell clicked
  drawer: boolean = false //whether show the navigation drawer
  uss: object = UserStatusSequence// status information sequence
  US: object = USER_STATUS// user status constants
  usrStatus!: string // current user's status, the initial values is IS_NOT_LOGIN

  //life circle
  created() {
    this.usrStatus = $us.getStatus
  }
  //click event
  /**
   * backstage button click event
   */
  onBackstageClick() {
    this.isBackstageClicked = true

    //if the global loginStatus is normal user,
    //show the normal user backstage center after clicking the button
    if ($us.getStatus == USER_STATUS.LOGGED.NORMAL)
      this.$router.push({ path: "/normal-user" })

    // if match the adminstrater.
    //show the adminstrater backstage center after clicking the button
    else if ($us.getStatus == USER_STATUS.LOGGED.ADMINISTRATER)
      this.$router.push({ path: "/adminstrater" })
  }
  /**
   * message bell button click event
   */
  onMessageBellClick() {
    this.isMessageBellClicked = true
  }
  //accept
  /**
   * alert-message quit action
   */
  alertMessageQuit() {
    this.isBackstageClicked = false
  }
}
</script>

<style>
</style>