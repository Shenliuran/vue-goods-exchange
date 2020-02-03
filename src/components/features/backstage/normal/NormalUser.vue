<template>
  <v-app>
    <!--normal user backstage center navigation drawer-->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      dark
      width="20%"
    >
      <v-list dense>
        <v-container>
          <v-subheader>
            <v-row
              align="center"
            >
            <v-col
              align-self="center"
            >
              <v-avatar>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
              <!--test field-->
              <p>{{username}}</p>
            </v-col>
            </v-row>
          </v-subheader>
        </v-container>
        <!--normal user close event-->
        <v-btn
          to="/home"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
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
      </h3>
      </v-toolbar-title>
    </v-app-bar>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import USS from "@/global/user-status-sequence";
import { USER_STATUS } from "@/global/constants"

@Component
export default class NormalUser extends Vue {
  //data values
  uss: object = USS
  loginStatus: string = USER_STATUS.LOGGED.NORMAL //set global loginStatus for normal user
  drawer: boolean = false //whether show the navigation drawer
  username!: string //normal user's name
  password!: string //normal user's password

  //life circle
  /**
   * before create this vue instance
   */
  beforeCreate() {
    //get user information via vuex getters
    this.username = this.$store.getters.getUsername
    this.password = this.$store.getters.getPassword
  }

  //click event
}
</script>

<style>

</style>