<template>
  <v-app>
    <!--homepage navigation drawer-->
    <v-card
      elevation="24"
      width="256"
    >
    <v-navigation-drawer
      app
      permanent
      expand-on-hover
      mini-variant
      mini-variant-width="40"
    >
      <v-list
        dense
      >
        <template
          v-for="(category, i) in allCategories"
        >
        <v-list-item
          :key="i"
          link
          @click="record(category)"
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
        v-model="buf"
        @keyup.enter="keyword=buf"
        style="width: 200%;"
      />
      <v-container>
        <v-spacer></v-spacer>
      </v-container>
      <!--Management center button-->
      <v-tooltip
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            large
            @click="onManagementClick"
          >
            <v-icon>mdi-contacts</v-icon>
          </v-btn>
        </template>
        <span>Contacts</span>
      </v-tooltip>
      <!--message bell button-->
      <!--call message bell-->
      <!-- <message-bell/> -->
      <alert-message
        v-if="usrStatus == us.getIsNotLogin.text"
        v-bind:isManagementClicked="isManagementClicked"
        @alertMessageQuitListener="alertMessageQuit"
      />
      <!--call Management center-->
    </v-app-bar>
    <!--placeholder-->
    <v-content>
      <showcase
        v-bind:categoryRecord="categoryRecord"
        v-bind:keyword="keyword"
      />
    </v-content>
  </v-app>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import AlertMessage from "@/components/features/login-and-registration/AlertMessage.vue"
import MessageBell from "@/components/features/notification/MessageBell.vue"
import { getModule } from 'vuex-module-decorators';
import Showcase from '@/components/layout/Showcase.vue'
import UserStatus from "@/store/modules/userStatus"
import { ConstCategories, ConstUserStatus } from "@/store/modules/globalConst"


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
export default class FrameWork extends Vue {
  //prop values
  //data values
  isManagementClicked: boolean = false //whether the Management clicked
  isMessageBellClicked: boolean = false //whether the message bell clicked
  usrStatus!: string// current user's status, the initial values is IS_NOT_LOGIN
  allCategories!: Array<{icon: string, text: string}>
  us = $cus
  categoryRecord: {icon: string, text: string} = {icon: "", text: ""}
  buf: string = ""
  keyword: string = ""

  computed() {
  }
  //life circle
  created() {
    this.usrStatus = $us.getStatus.text
    this.allCategories = $type.getCategories.concat([
      {icon: "mdi-all-inclusive", text: "All"}
    ])
  }
  //click event
  /**
   * Management button click event
   */
  onManagementClick() {
    this.isManagementClicked = true

    //if the global loginStatus is normal user,
    //show the normal user Management center after clicking the button
    if ($us.getStatus == $cus.getNormal)
      this.$router.push({ path: "/normal-user" })

    // if match the administrator.
    //show the administrator Management center after clicking the button
    else if ($us.getStatus == $cus.getAdministrator)
      this.$router.push({ path: "/administrator" })
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
    this.isManagementClicked = false
  }
  record(category: {icon: string, text: string}) {
    this.categoryRecord = category
  }
  onEnter() {
    this.keyword = this.buf
  }
}
</script>

<style>
</style>