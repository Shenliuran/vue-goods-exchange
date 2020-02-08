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
                  >
                    Update Profile
                  </v-btn>
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
            {{username}} : {{password}}
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">CEO / CO-FOUNDER</h6>
            <h4 class="card-title font-weight-light">Alec Thompson</h4>
            <p class="card-description font-weight-light">Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>
            <v-btn
              color="success"
              rounded
              class="font-weight-light"
              @click="updateProfile"
            >Follow</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getModule } from 'vuex-module-decorators';
import UserProfile from "@/store/modules/UserProfile";

const $up = getModule(UserProfile)
@Component
export default class UserProfileForm extends Vue {
  password!: string //= this.$store.getters.getPassword // obtain from login form
  username!: string //= this.$store.getters.getUsername // obtain from login form
  email!: string // user's e-mail
  firstName!: string // user's real first name
  lastName!: string // user's real last name
  address!: string // user's location
  city!: string // user's city
  country!: string // user's country
  
  //life circle
  beforeCreate() {
    this.password = $up.getPassword // obtain from login form
    this.username = $up.getUsername // obtain from login form
    this.firstName = $up.getFirstName
    this.lastName = $up.getLastName
    this.email = $up.getEmail
    this.address = $up.getAddress
    this.city = $up.getCity
    this.country = $up.getCountry
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
  }
}
</script>
