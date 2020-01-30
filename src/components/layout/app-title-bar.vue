<template>
  <div>
    <!--homepage naviagtion drawer-->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      temporary
      app
      overflow
    >
    </v-navigation-drawer>
    <!--homepage title drawer-->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer != drawer"/>
      <v-toolbar-title
        style="width: 100%"
        class="ml-0 pl-4"
      >
        <span>Goods Exchange</span>
        <v-spacer/>
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
        v-bind:isBackstageClicked="isBackstageClicked"
        @alertMessageQuit="alertMessageQuitListener"
      />
      <!--call backstage center-->
    </v-app-bar>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import AlertMessage from "@/components/features/login-and-registeraion/alert-message.vue"
import UserStatusSequence from "@/global/user-status-sequence";
import MessageBell from "@/components/features/notification/message-bell.vue"

@Component({
  components: {
    AlertMessage,
    MessageBell
  }
})
export default class AppTitleBar extends Vue{
  //props values
  //data values
  isBackstageClicked: boolean = false //whether the backstage clicked
  isMessageBellClicked: boolean = false //whether the message bell clicked
  drawer: boolean = false //whether show the navigation drawer
  uss: object = UserStatusSequence// status information sequence

  //click event
  /**
   * backstage button click event
   */
  onBackstageClick() {
    this.isBackstageClicked = true
  }
  /**
   * message bell button click event
   */
  onMessageBellClick() {
    this.isMessageBellClicked = true
  }
  
  //listener
  alertMessageQuitListener() {
    this.isBackstageClicked = false
  }
}
</script>

<style>
</style>