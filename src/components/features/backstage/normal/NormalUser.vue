<template>
  <v-app>
    <v-container
      fill-height
      fluid
      grid-list-xl
    >
      <v-layout wrap>
        <v-flex
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
                  <v-list-item
                    link
                    :to="link.to"
                  >
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
                    <v-icon>{{us.getNormal.icon}}</v-icon>
                  </v-avatar>
                    {{us.getNormal.text}}
                    <v-spacer/>
                    <!--test field-->
                </h3>
              </v-toolbar-title>
              <v-spacer/>
              <v-breadcrumbs :items="items"></v-breadcrumbs>
            </v-app-bar>
            <v-container><v-spacer/></v-container>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import UserProfile from "@/store/modules/userProfile";
import { getModule } from 'vuex-module-decorators';
import UserStatus from  "@/store/modules/userStatus"
import { ConstUserStatus } from '../../../../store/modules/globalConst';
import { RouteRecord } from 'vue-router';

const $up = getModule(UserProfile)
const $us = getModule(UserStatus)
const $cus = getModule(ConstUserStatus)
@Component
export default class NormalUser extends Vue {
  //data values
  loginStatus = $cus.getNormal//set global loginStatus for normal user
  drawer: boolean = false //whether show the navigation drawer
  username!: string //normal user's name
  password!: string //normal user's password
  features!: string //features
  us = $cus
  items: { text: string, disable: boolean }[] = []
  //features
  links = [
    {
      to: "",
      icon: "mdi-view-dashboard",
      text: "Dashboard"
    },
    {
      to: "/normal-user/user-profile-form",
      icon: "mdi-account",
      text: "User Profile"
    },
    {
      to: "/normal-user/addition-form",
      icon: "mdi-file-document-box-plus",
      text: "Add Commodity"
    },
    {
      to: "/normal-user/history",
      icon: "mdi-history",
      text: "History"
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

  @Watch("$route")
  getBreadcrumb() {
    let matched = this.$route.matched
    if (this.items.length != 0)
      this.items.length = 0
    matched.forEach((elem) => {
      this.items.push({
        text: elem.meta.title,
        disable: false
      })
    })
  }
  //life circle
  /**
   * before create this vue instance
   */
  created() {
    //get user information via vuex getters
    this.username = $up.getUsername
    this.password = $up.getPassword
    this.getBreadcrumb()
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