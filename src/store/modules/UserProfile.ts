import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from '../index';

@Module({
  name: "userProfile",
  store,
  dynamic: true
})
export default class UserProfile extends VuexModule {
  //state
  private username: string = ""
  private password: string = ""
  private email: string = ""
  private firstName: string = ""
  private lastName: string = ""
  private address: string = ""
  private city: string = ""
  private country: string = ""
  private userId: number = -1

  @Mutation
  setUserProfile(obj: {
    username: string,
    password: string,
    address: string,
    email: string,
    firstName: string,
    lastName: string,
    city: string,
    country: string,
  }) {
    this.username = obj.username
    this.password = obj.password
    this.address = obj.address
    this.email = obj.email
    this.firstName = obj.firstName
    this.lastName = obj.lastName
    this.city = obj.city
    this.country = obj.country
  }
  @Mutation
  setBasicUserProfile(obj: { username: string, password: string }) {
    this.username = obj.username
    this.password = obj.password
  }

  @Mutation
  setUserId(userId: number) { this.userId = userId }

  get getFullName(): string { return this.firstName + " " + this.lastName }
  get getUsername() { return this.username }
  get getPassword() { return this.password }
  get getAddress() { return this.address }
  get getLastName() { return this.lastName }
  get getFirstName() { return this.firstName }
  get getCity() { return this.city }
  get getCountry() { return this.country }
  get getEmail() { return this.email }
  get getUserId() { return this.userId }
}