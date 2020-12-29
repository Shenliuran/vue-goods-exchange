<template>
  <v-data-table
    :headers="headers"
    :items="users"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          用户管理
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>修改</v-card-title>
            
            <v-card-text>
              <v-container>
                <v-text-field
                  v-model="editedItem.userID"
                  label="用户ID"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.username"
                  label="用户名"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.password"
                  label="密码"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.firstName"
                  label="名"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.lastName"
                  label="姓"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.email"
                  label="邮箱"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.address"
                  label="地址"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.city"
                  label="所在城市"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.country"
                  label="所在国家"
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
                取消
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
      <span>无数据</span>
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
    { text: "用户ID",value: "userId" },
    { text: "用户名", align: "start", value: "username" },
    { text: "权限", value: "authority" },
    { text: "密码", value: "password" },
    { text: "编辑", value: "action", sortable: false }
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
      resp.data == "1" ? alert("删除成功") : alert("删除失败")
    })
    confirm("您确定要删除吗") && this.users.splice(index, 1)
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