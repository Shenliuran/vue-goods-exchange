import { Module, VuexModule, Action, Mutation, getModule } from "vuex-module-decorators";
import store from '../index';
import { ConstUserStatus, Prototype } from "./globalConst"

const $cus = getModule(ConstUserStatus)
@Module({
  name: "userStatus",
  store,
  dynamic: true
})
export default class UserStatus extends VuexModule {
  // private status: string = USER_STATUS.IS_NOT_LOGIN
  private status = $cus.getIsNotLogin

  get getStatus() { return this.status }

  @Mutation
  setStatus(status: Prototype) { this.status = status }
}