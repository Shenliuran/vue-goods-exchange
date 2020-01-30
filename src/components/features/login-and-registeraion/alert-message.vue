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
        v-if="status == US.IS_NOT_LOGIN"
      >
        <v-card-title>
          <h3>{{uss.isNotLogin.text}}</h3>
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
          <v-icon>{{uss.isNotLogin.icon}}</v-icon>
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
          <!--register evnet-->
          <v-btn
            @click="registering"
          >
            注册
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
      <!--logging panel-->
      <logging
        v-else-if="status == US.LOGGING"
        @loggingBackListener="status = US.IS_NOT_LOGIN"
      />
      <!--registering panel-->
      <registering
        v-else-if="status == US.REGISTERING"
        @registeringBackListener="status = US.IS_NOT_LOGIN"
      />
    </v-dialog>
  </v-app>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import UserStatusSequence from "@/global/user-status-sequence";
import { USER_STATUS } from "@/global/constants";
import Logging from "./logging.vue"
import Registering from "./registering.vue"

@Component({
  components: {
    Logging,
    Registering
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
  US: Object = USER_STATUS
  status: number = USER_STATUS.IS_NOT_LOGIN
  uss: object = UserStatusSequence

  //click event
  @Emit("alertMessageQuit")
  close() {}
  logging() {
    this.status = USER_STATUS.LOGGING
  }
  registering() {
    this.status = USER_STATUS.REGISTERING
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