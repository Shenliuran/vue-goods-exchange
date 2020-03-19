<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
        <v-card
          raised
          elevation="24"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="Company (disabled)"
                    disabled/>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    class="purple-input"
                    label="User Name"
                    v-model="username"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                    v-model="email"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                    v-model="firstName"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                    v-model="lastName"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    label="Address"
                    class="purple-input"
                    v-model="address"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    label="City"
                    class="purple-input"
                    v-model="city"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    label="Country"
                    class="purple-input"
                    v-model="country"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md4>
                  <v-text-field
                    class="purple-input"
                    label="Postal Code"
                    type="number"/>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    class="purple-input"
                    label="Password"
                    v-model="password"
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="updateProfile"
                  >
                    Update Profile
                  </v-btn>
                  <v-snackbar
                    top
                    v-model="snackbar"
                  >
                    update successful
                    <v-btn
                      @click="snackbar = !snackbar"
                    >
                      Close
                    </v-btn>
                  </v-snackbar>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        md4
      >
        <v-card class="v-card-profile">
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130"
          >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">CEO / CO-FOUNDER</h6>
            <p>User Profile area</p>
            <v-btn
              color="success"
              rounded
              class="font-weight-light"
              @click="logout"
            >Logout</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getModule } from 'vuex-module-decorators';
import UserProfile from "@/store/modules/userProfile";
import UserStatus from "@/store/modules/userStatus"
import { ConstUserStatus } from '../../../../store/modules/globalConst';
import { basicUrls } from '../../../../api/urls';

const $up = getModule(UserProfile)
const $us = getModule(UserStatus)
const $cus = getModule(ConstUserStatus)
@Component
export default class UserProfileForm extends Vue {
  password: string = ""//= this.$store.getters.getPassword // obtain from login form
  username: string = ""//= this.$store.getters.getUsername // obtain from login form
  email: string = ""// user's e-mail
  firstName: string = ""// user's real first name
  lastName: string = ""// user's real last name
  address: string = ""// user's location
  city: string = ""// user's city
  country: string = ""// user's country
  snackbar: boolean = false
  userId: number = -1
  
  //life circle
  created() {
    this.password = $up.getPassword // obtain from login form
    this.username = $up.getUsername // obtain from login form
    this.axios.post(basicUrls.dev + "/user/getUserProfile", {
      username: this.username,
      password: this.password
    }).then(response => {
      this.firstName = response.data.firstName
      this.lastName = response.data.lastName
      this.email = response.data.email
      this.address = response.data.address
      this.city = response.data.city
      this.country = response.data.country
      this.userId = response.data.userId
    })
  }
  // click event
  updateProfile() {
    $up.setUserProfile({
      username: this.username,
      password: this.password,
      address: this.address,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      city: this.city,
      country: this.country
    })
    this.snackbar = true
    this.axios.post(basicUrls.dev + "/user/updateUserProfile", {
      username: this.username,
      password: this.password,
      address: this.address,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      city: this.city,
      country: this.country,
      userId: this.userId
    })
  }
  logout() {
    this.$router.push({path: "/home"})
    $us.setStatus($cus.getIsNotLogin)
  }
}
</script>
