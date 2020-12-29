<template>
<v-app>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        v-for="(item, i) in integrateSet()"
        :key="i"
      >
        <v-card
          class="card"
          style="width: 150px;"
          raised
          elevation="24"
          @click="onClick(item)"
        >
          <v-card-title>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <img
                  v-on="on"
                  class="cover"
                  :src="item.picture"
                />
              </template>
              <span>
                <img
                  :src="item.picture"
                  class="larger"
                />
              </span>
            </v-tooltip>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="item.goodsName"
              label="物品名称"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="item.ownerName"
              label="拥有者"
              disabled
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-dialog
        v-model="dialog"
        max-width="270px"
        hide-overlay
      >
        <v-card>
          <v-card-title>Details</v-card-title>
          <v-card-text>
            <img
              :src="editedItem.picture"
              class="img"
            />
            <v-text-field
              label="物品名称"
              v-model="editedItem.goodsName"
              disabled
            ></v-text-field>
            <v-text-field
              label="拥有者"
              v-model="editedItem.ownerName"
              disabled
            ></v-text-field>
            <v-text-field
              label="分类"
              v-model="editedItem.category"
              disabled
            ></v-text-field>
            <v-text-field
              label="联系方式"
              v-model="editedItem.contact"
              disabled
            ></v-text-field>
            <v-textarea
              label="描述"
              v-model="editedItem.description"
              disabled
            ></v-textarea>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close" text >取消</v-btn>
            <v-btn
              v-show="isMyGoods(editedItem)"
              @click="want(editedItem)"
              text
            >Want</v-btn>
            <v-btn
              v-show="isMyGoods(editedItem)"
              @click="insertShoppingCar(editedItem)"
            >添加购物车</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
<!--  -->
      <v-dialog
        v-model="showMyGoods"
      >
        <v-container>
        <v-data-table
          :headers="header"
          :items="myGoods"
          class="elevation-1"
        >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              我的商品
            </v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            text
            small
            @click="deliver(item)"
          >选择</v-btn>
        </template>
        <template v-slot:no-data>
          <span>No Data</span>
        </template>
        </v-data-table>
      </v-container>
      </v-dialog>
<!--  -->
      <v-pagination
        v-model="page"
        :value="page"
        :length="10"
        :total-visible="10"
        @input="pageChange"
      >
      </v-pagination>
    </v-layout>
  </v-container>
</v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { basicUrls } from "../../api/urls"
import { getModule } from 'vuex-module-decorators'
import UserStatus from '../../store/modules/userStatus'
import { ConstUserStatus } from '../../store/modules/globalConst'
import UserProfile from '../../store/modules/userProfile'
import { DataTableHeader } from 'vuetify'

const $us = getModule(UserStatus)
const $cus = getModule(ConstUserStatus)
const $up = getModule(UserProfile)
@Component
export default class Showcase extends Vue {
  @Prop({
    type: Object,
    required: false,
  })
  categoryRecord!: {icon: string, text: string}
  @Prop({
    type: String,
    required: false
  })
  keyword!: string
  showMyGoods: boolean = false
  header: DataTableHeader[] = [
    { text: "商品名称", align: "start", value: "goodsName" },
    { text: "分类", value: "category" },
    { text: "Actions", value: "action", sortable: false }
  ]

  editedIndex: number = -1
  editedItem: {
    goodsName: string,
    picture: string,
    category: string,
    description: string,
    contact: string
  } = {
    goodsName: "",
    picture: "",
    category: "",
    description: "",
    contact: ""
  }
  page: number = 1
  pageSize: number = 18
  dialog: boolean = false
  goods: Array<{
    goodsName: string,
    ownerName: string,
    picture: string,
    category: string,
    description: string
    contact: string
  }> = []
  myGoods: Array<{
    goodsName: string,
    category: string,
  }> = []
  test() {
    this.goods = require("../../../src/test/testingGoods.json")
    // console.log(this.goods)
  }

  created() {
    this.axios.get(basicUrls.dev + '/goods/findAllByIsSelected?page=0&size=' + this.pageSize).then(response => {
      this.goods = response.data
    })
    // this.test();
  }
  search() {
    let str = this.keyword
    let resultSet: Array<{
      goodsName: string,
      ownerName: string,
      picture: string,
      category: string,
      description: string
      contact: string
    }> = []
    if (str) {
      resultSet = this.goods.filter(item => {
        return item.goodsName.indexOf(str) > -1 || item.ownerName.indexOf(str) > -1;
      })
    }
    return resultSet
  }
  classify() {
    let resultSet: Array<{
      goodsName: string,
      ownerName: string,
      picture: string,
      category: string,
      description: string
      contact: string
    }> = []
    this.goods.forEach(elem => {
      if (elem.category == this.categoryRecord.text) {
        resultSet.push(elem)
      }
    })
    if (resultSet.length == 0 || this.categoryRecord.text == "All")
      return this.goods
    else
      return resultSet
  }
  integrateSet() {
    if (this.keyword)
      return this.search()
    else
      return this.classify()
  }
  pageChange(currentPage: number) {
    this.axios.get(basicUrls.dev +
      '/goods/findAllByIsSelected?page=' + (currentPage - 1) +
      '&size=' + this.pageSize).then(response => {
      this.goods = response.data
    })
  }
  onClick(item: any) {
    this.dialog = true
    this.editedIndex = this.goods.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialog = true
  }
  close() {
    this.dialog = false
    this.showMyGoods = false
  }
  want(item: {
    goodsName: string,
    goodsId: number,
    ownerId: number,
    ownerName: string
  }) {
    console.log(item)
    console.log($up.getUserId)
    if ($us.getStatus.text == $cus.getIsNotLogin.text)
      alert("您还没有登录")
    else {
      this.axios.post(basicUrls.dev + "/transaction/addTransaction", {
        goodsName: item.goodsName,
        goodsId: item.goodsId,
        receiverId: item.ownerId,
        sponsorId: $up.getUserId,
        sponsorName: $up.getUsername,
        receiverName: item.ownerName
      })
      alert("购入成功，等待对方确认...");
      this.axios.get(basicUrls.dev + "/goods/findGoodsByOwnerId?ownerId="
      + $up.getUserId).then(response => {
        let buf: Array<any> = response.data
          buf.forEach(item => {
            this.myGoods.push({
              goodsName: item.goodsName,
              category: item.category,
            })
        })
    })
      this.dialog = false
      this.showMyGoods = true
    }
  }
  deliver(item: {
    goodsName: string,
    goodsId: number,
    ownerId: number,
    ownerName: string
  }) {
    alert("等待对方确认...")
  }
  insertShoppingCar(item: any) {
    if ($us.getStatus.text == $cus.getIsNotLogin.text)
      alert("您还没有登录")
    else {
      console.log(item.goodsId)
      this.axios.post(basicUrls.dev + "/shoppingCar/insertShoppingCar", {
        goodsId: item.goodsId,
        userId: $up.getUserId
      }).then(resp => {
        alert("添加成功");
      })
    }
  }
  isMyGoods(item: any) {
    if (item.ownerId == $up.getUserId || $us.getStatus == $cus.getAdministrator)
      return false
    else
      return true
  }
}
</script>

<style scoped>
  .img {
    height: 150px;
  }
  .cover {
    width: 125px;
    margin: auto;
    cursor: pointer;
  }
  .larger {
    width: 200px;
  }
  .title {
    font-size: 14px;
    text-align: left;
  }
  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }
  .card {
    right: inherit;
    bottom: inherit;
  }
  .goods-area {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }
</style>