import { Module, VuexModule } from "vuex-module-decorators"
import store from "../index"

@Module({
  name: "const_categories",
  store,
  dynamic: true
})
export class ConstCategories extends VuexModule {
  private categories: Array<Prototype> = [
    { text: "Book", icon: "mdi-book-open-page-variant" },
    { text: "Digital", icon: "mdi-laptop" },
    { text: "Health/Makeup", icon: "mdi-heart-pulse" },
    { text: "Clothes", icon: "mdi-hanger" },
    { text: "Sports", icon: "mdi-basketball" },
    { text: "Foods", icon: "mdi-food-variant" }
  ]

  get getCategories() { return this.categories }
}

@Module({
  name: "const_userStatus",
  store,
  dynamic: true
})
export class ConstUserStatus extends VuexModule {
  private isNotLogin: Prototype = {
    icon: "mdi-account-off-outline",
    text: "Notices"
  }
  private logging: Prototype = {
    icon: "mdi-login",
    text: "logging"
  }
  private registering: Prototype = {
    icon: "mdi-account-plus",
    text: "registering"
  }
  private normal: Prototype = {
    icon: "mdi-account-circle",
    text: "User"
  }
  private administrater: Prototype = {
    icon: "mdi-shield-account",
    text: "Administrater"
  }
  
  get getIsNotLogin() : Prototype { return this.isNotLogin }
  get getLogging() : Prototype { return this.logging }
  get getRegistering() : Prototype { return this.registering }
  get getNormal() : Prototype { return this.normal }
  get getAdminstrater() : Prototype { return this.administrater }
}

export interface Prototype {
  icon: string
  text: string
}