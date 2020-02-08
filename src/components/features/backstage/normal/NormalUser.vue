<template>
  <v-app>
    <v-container
      fill-height
      fluid
      grid-list-xl
    >
      <v-layout wrap>
        <v-flex
          align-self-end
        >
        <!--normal user backstage center navigation drawer-->
          <v-navigation-drawer
            v-model="drawer"
            app
            temporary
            width="260"
            overflow
            :clipped="$vuetify.breakpoint.lgAndUp"
          >
              <v-list dense>
                <v-list-item-subtitle>
                  <v-list-item-avatar
                    color="white"
                  >
                  </v-list-item-avatar>
                  <v-list-item-title
                    class="title"
                  >
                    {{username}}
                  </v-list-item-title>
                </v-list-item-subtitle>
                <v-divider/>
                <template
                  v-for="(link, i) in links"
                >
                  <v-row
                    :key="i"
                    align="center"
                  >
                  <v-col>
                  <v-list-item link>
                    <v-list-item-action>
                      <v-icon>{{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{link.text}}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  </v-col>
                  </v-row>
                </template>
                <!--normal user close event-->
                  <v-list-item
                    link
                    to="/home"
                  >
                    <v-list-item-action>
                      <v-icon>mdi-close</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        Back
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                <!-- <v-btn
                  to="/home"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn> -->
              </v-list>
          </v-navigation-drawer>
          <!--normal user backstage app bar-->
          <v-app-bar
            app
            :clipped="$vuetify.breakpoint.lgAndUp"
            right
          >
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
            />
              <v-toolbar-title
                right
              >
                <h3>
                  <v-avatar>
                    <v-icon>{{uss.normal.icon}}</v-icon>
                  </v-avatar>
                    {{uss.normal.text}}
                    <v-spacer/>
                    <!--test field-->
                </h3>
              </v-toolbar-title>
            </v-app-bar>
        </v-flex>
        <v-flex>
          <user-profile-form/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import USS from "@/global/user-status-sequence";
import { USER_STATUS } from "@/global/constants"
import UserProfileForm from "./UserProfileForm.vue"
import UserProfile from "@/store/modules/UserProfile";
import { getModule } from 'vuex-module-decorators';
import UserStatus from  "@/store/modules/UserStatus"

const $up = getModule(UserProfile)
const $us = getModule(UserStatus)
@Component({
  components: {
    UserProfileForm
  }
})
export default class NormalUser extends Vue {
  //data values
  uss: object = USS
  loginStatus: string = USER_STATUS.LOGGED.NORMAL //set global loginStatus for normal user
  drawer: boolean = false //whether show the navigation drawer
  username!: string //normal user's name
  password!: string //normal user's password
  features!: string //features

  //features
  links = [
    {
      to: "",
      icon: "mdi-view-dashboard",
      text: "Dashboard"
    },
    {
      to: "",
      icon: "mdi-account",
      text: "User Profile"
    },
    {
      to: "",
      icon: "mdi-clipboard-outline",
      text: "Table List"
    },
    {
      to: "",
      icon: "mdi-format-font",
      text: "Typography"
    },
    {
      to: "",
      icon: "mdi-map-marker",
      text: "Maps"
    },
    {
      to: "",
      icon: "mdi-bell",
      text: "Notification"
    },
  ]

  //life circle
  /**
   * before create this vue instance
   */
  created() {
    //get user information via vuex getters
    this.username = $up.getUsername
    this.password = $up.getPassword
  }
  //click event
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list_tile {
      border-radius: 4px;
      margin-top: auto;
      margin-bottom: 17px
    }
  }
</style>