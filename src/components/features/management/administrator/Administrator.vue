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
        <!--normal user Management center navigation drawer-->
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
          <!--normal user Management app bar-->
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
                    <v-icon>{{us.getAdministrator.icon}}</v-icon>
                  </v-avatar>
                    {{us.getAdministrator.text}}
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
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator";
import { ConstUserStatus } from "@/store/modules/globalConst"
import { getModule } from 'vuex-module-decorators';
import UserProfile from '../../../../store/modules/userProfile';

const $cus = getModule(ConstUserStatus)
const $up = getModule(UserProfile)
@Component
export default class Administrator extends Vue {
  //data values
  us: ConstUserStatus = $cus
  loginStatus: string = $cus.getAdministrator.text //set global loginStatus for normal user
  drawer: boolean = false //whether show the navigation drawer
  username!: string //administrator's name
  password!: string //administrator's password
  items: { text: string, disable: boolean }[] = []

  links: { to: string, icon: string, text: string }[] = [
    {
      to: "/administrator/admin-profile-form",
      icon: "mdi-account",
      text: "Admin Profile"
    },
    {
      to: "/administrator/user-info-manage",
      icon: "mdi-stack-exchange",
      text: "User Info Management"
    },
    {
      to: "/administrator/goods-manage",
      icon: "mdi-book",
      text: "Goods Management"
    }
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
  /**
   * before create this vue instance
   */
  created() {
    //get user information via vuex getters
    this.username = $up.getUsername
    this.password = $up.getPassword
    this.getBreadcrumb()
  }
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