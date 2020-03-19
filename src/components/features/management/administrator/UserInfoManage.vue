<template>
  <v-data-table
    :headers="headers"
    :items="users"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          User Management
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>Modify</v-card-title>
            
            <v-card-text>
              <v-container>
                <v-text-field
                  v-model="editedItem.userID"
                  label="User ID"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.username"
                  label="Username"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.password"
                  label="Password"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.firstName"
                  label="First Name"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.lastName"
                  label="Last Name"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.address"
                  label="Address"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.city"
                  label="City"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.country"
                  label="Country"
                  disabled
                ></v-text-field>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                @click="close"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        @click="checkItem(item)"
      >
        mdi-eye
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <span>No Data</span>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { DataTableHeader } from 'vuetify'
import { basicUrls } from '../../../../api/urls'
import { getModule } from 'vuex-module-decorators'
import UserProfile from '../../../../store/modules/userProfile'

const $up = getModule(UserProfile)
@Component
export default class Management extends Vue {
  dialog: boolean = false
  editedIndex: number = -1
  editedItem: {
    userId: number;
    username: string,
    password: string,
    address: string,
    firstName: string,
    lastName: string,
    city: string,
    country: string,
    email: string,
    authority: string
  } = {
    userId: -1,
    username: "",
    password: "",
    address: "",
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    email: "",
    authority: ""
  }
  headers: DataTableHeader[] = [
    { text: "User ID",value: "userId" },
    { text: "Username", align: "start", value: "username" },
    { text: "Role", value: "authority" },
    { text: "Password", value: "password" },
    { text: "Actions", value: "action", sortable: false }
  ]
  users: Array<{
    userId: number,
    username: string,
    password: string,
    address: string,
    email: string,
    firstName: string,
    lastName: string,
    city: string,
    country: string,
    authority: string
  }> = []

  beforeCreate() {
    this.axios.get(basicUrls.dev + "/user/allUsers").then(response => {
      let cache: Array<any> = response.data
      cache.forEach(item => {
          this.users.push({
            userId: item.userId,
            username: item.username,
            password: item.password,
            address: item.address,
            email: item.email,
            firstName: item.firstName,
            lastName: item.lastName,
            city: item.city,
            country: item.country,
            authority: item.authority == 1 ? "administrator" : "normal"
          })
        })
    })
  }
  checkItem(item: any) {
    this.editedIndex = this.users.indexOf(item)
    this.editedItem = item
    this.dialog = true
  }
  deleteItem(item: any) {
    const index = this.users.indexOf(item)
    this.axios.post(basicUrls.dev + "/user/deleteUserByUserId", {
      userId: item.userId
    }).then(resp => {
      resp.data == "1" ? alert("delete success") : alert("delete failed")
    })
    confirm("Are you sure you want to delete this goods") && this.users.splice(index, 1)
  }

  close() {
    this.dialog = false
  }
}
</script>

<style>
  #echo {
    height: 150px;
    /* width: inherit; */
  }
  .img {
    height: inherit;
  }
  .image_frame {
    border: 1px dashed;
    height: 150px;
    width: 150px;
  }
</style>