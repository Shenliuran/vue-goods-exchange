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
              label="Goods Name"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="item.ownerName"
              label="Owner"
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
              label="Goods Name"
              v-model="editedItem.goodsName"
              disabled
            ></v-text-field>
            <v-text-field
              label="Owner Name"
              v-model="editedItem.ownerName"
              disabled
            ></v-text-field>
            <v-text-field
              label="Category"
              v-model="editedItem.category"
              disabled
            ></v-text-field>
            <v-textarea
              label="Description"
              v-model="editedItem.description"
              disabled
            ></v-textarea>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close" text >Cancel</v-btn>
            <v-btn
              v-show="isMyGoods(editedItem)"
              @click="want(editedItem)"
              text
            >Want</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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

  editedIndex: number = -1
  editedItem: {
    goodsName: string,
    picture: string,
    category: string,
    description: string,
    isSelected: boolean
  } = {
    goodsName: "",
    picture: "",
    category: "",
    description: "",
    isSelected: false
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
    }> = []
    this.goods.forEach(elem => {
      if (elem.category == this.categoryRecord.text)
        resultSet.push(elem)
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
  }
  want(item: {
    goodsName: string,
    goodsId: number,
    ownerId: number,
    ownerName: string
  }) {
    if ($us.getStatus.text == $cus.getIsNotLogin.text)
      alert("You have not login")
    else {
      this.axios.post(basicUrls.dev + "/transaction/addTransaction", {
        goodsName: item.goodsName,
        goodsId: item.goodsId,
        sponsorId: item.ownerId,
        receiverId: $up.getUserId,
        receiverName: item.ownerName,
        sponsorName: $up.getUsername
      })
      this.dialog = false
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