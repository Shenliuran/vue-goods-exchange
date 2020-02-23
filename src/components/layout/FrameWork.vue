<template>
  <v-app>
    <!--homepage naviagtion drawer-->
    <v-card
      elevation="24"
      width="256"
    >
    <v-navigation-drawer
      app
      clipped
      v-model="homeDrawer"
    >
      <v-list
        dense
      >
        <template
          v-for="(category, i) in categories"
        >
        <v-list-item
          :key="i"
          link
        >
          <v-list-item-icon>
            <v-icon>
              {{category.icon}}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              style="font-size: 16px;"
            >
              {{category.text}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    </v-card>
    <!--homepage title drawer-->
    <v-app-bar
      clipped-left
      app
    >
      <v-app-bar-nav-icon
        @click.stop="homeDrawer = !homeDrawer"
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
      <v-tooltip
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            large
            @click="onBackstageClick"
          >
            <v-icon>mdi-contacts</v-icon>
          </v-btn>
        </template>
        <span>Contacts</span>
      </v-tooltip>
      <!--message bell button-->
      <!--call message bell-->
      <message-bell/>
      <!--call dialog message:you haven't logged-->
      <alert-message
        v-if="usrStatus == us.getIsNotLogin.text"
        v-bind:isBackstageClicked="isBackstageClicked"
        @alertMessageQuitListener="alertMessageQuit"
      />
      <!--call backstage center-->
    </v-app-bar>
    <!--placeholder-->
    <v-content>
      <showcase/>
    </v-content>
  </v-app>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import AlertMessage from "@/components/features/login-and-registeraion/AlertMessage.vue"
import MessageBell from "@/components/features/notification/MessageBell.vue"
import { getModule } from 'vuex-module-decorators';
import Showcase from '@/components/layout/Showcase.vue'
import UserStatus from "@/store/modules/userStatus"
import { ConstCategories, ConstUserStatus, Prototype } from "@/store/modules/globalConst"


const $us = getModule(UserStatus)
const $type = getModule(ConstCategories)
const $cus = getModule(ConstUserStatus)
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
  homeDrawer: boolean = false //whether show the navigation drawer
  usrStatus!: string// current user's status, the initial values is IS_NOT_LOGIN
  categories!: Array<Prototype>
  us = $cus

  computed() {
  }
  //life circle
  created() {
    this.usrStatus = $us.getStatus.text
    this.categories = $type.getCategories
  }
  //click event
  /**
   * backstage button click event
   */
  onBackstageClick() {
    this.isBackstageClicked = true

    //if the global loginStatus is normal user,
    //show the normal user backstage center after clicking the button
    if ($us.getStatus == $cus.getNormal)
      this.$router.push({ path: "/normal-user" })

    // if match the adminstrater.
    //show the adminstrater backstage center after clicking the button
    else if ($us.getStatus == $cus.getAdminstrater)
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