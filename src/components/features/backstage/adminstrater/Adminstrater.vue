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
            <v-icon>{{uss.getAdminstrater.icon}}</v-icon>
        </v-avatar>
          {{uss.getAdminstrater.text}}
      </h3>
      </v-toolbar-title>
    </v-app-bar>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ConstUserStatus } from "@/store/modules/globalConst"
import { getModule } from 'vuex-module-decorators';

const $cus = getModule(ConstUserStatus)
@Component
export default class NormalUser extends Vue {
  //data values
  uss: ConstUserStatus = $cus
  loginStatus: string = $cus.getAdminstrater.text //set global loginStatus for normal user
  drawer: boolean = false //whether show the navigation drawer
  username!: string //adminstrater's name
  password!: string //adminstrater's password

  /**
   * before create this vue instance
   */
  beforeCreate() {
    //get user information via vuex getters
    this.username = this.$store.getters.getUsername
    this.password = this.$store.getters.getPassword
  }

}
</script>

<style>

</style>