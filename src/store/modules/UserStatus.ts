import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { USER_STATUS } from "@/global/constants";
import store from '../index';

@Module({
  name: "userStatus",
  store,
  dynamic: true
})
export default class UserStatus extends VuexModule {
  private status: string = USER_STATUS.IS_NOT_LOGIN

  get getStatus() { return this.status }

  @Mutation
  setStatus(status: string) { this.status = status }
}