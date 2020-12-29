<template>
<v-app>
  <v-container>
  <v-data-table
    :headers="headers"
    :items="goods"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          购物车
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>详细信息</v-card-title>
            
            <v-card-text>
              <v-container>
                <v-text-field
                  v-model="editedItem.goodsName"
                  label="物品名称"
                  disabled
                ></v-text-field>
                <span>图片</span>
                <div class="image_frame">
                  <img
                    :src="editedItem.picture"
                    class="img"
                    id="echo"
                  />
                </div>
                <div><v-spacer></v-spacer></div>
                <v-file-input
                  type="file"
                  id="input"
                  messages="只能添加一张照片"
                  @change="echo"
                  disabled
                >
                </v-file-input>
                <v-select
                  chips
                  label="分类"
                  v-model="editedItem.category"
                  disabled
                ></v-select>
                <v-textarea
                  v-model="editedItem.description"
                  label="物品描述"
                  aria-multiline
                  disabled
                ></v-textarea>
                <v-textarea
                  v-model="editedItem.description"
                  label="联系方式"
                  aria-multiline
                  disabled
                ></v-textarea>
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
      <v-btn
        text
        @click="want(item)"
      >
        want
      </v-btn>
      <v-icon
        small
        @click="editItem(item)"
      >
        mdi-pencil
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
  </v-container>
</v-app>
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
  headers: DataTableHeader[] = [
    { text: "物品名称", align: "start", value: "goodsName" },
    { text: "分类", value: "category" },
    { text: "编辑", value: "action", sortable: false }
  ]
  goods: Array<{
    goodsId: number,
    goodsName: string,
    picture: string,
    category: string,
    description: string,
    contact: string
  }> = []
  myGoods: Array<{
    goodsName: string,
    category: string,
  }> = []
  showMyGoods: boolean = false
  header: DataTableHeader[] = [
    { text: "商品名称", align: "start", value: "goodsName" },
    { text: "分类", value: "category" },
    { text: "Actions", value: "action", sortable: false }
  ]

  beforeCreate() {
    this.axios.get(basicUrls.dev + "/shoppingCar/getShoppingCarByUserId?userId=" + $up.getUserId).then(response => {
      let buf: Array<any> = response.data
      buf.forEach(item => {
        this.goods.push({
          goodsId: item.goodsId,
          goodsName: item.goodsName,
          picture: item.picture,
          category: item.category,
          description: item.description,
          contact: item.contact
        })
      })
    })
  }
  echo() {
    let image = (((document.getElementById("input") as HTMLInputElement).files as FileList)[0] as Blob)
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = e => {
      ((document.getElementById("echo") as HTMLImageElement).src as String) = ((e.target as FileReader).result as String)
      this.editedItem.picture = (e.target as FileReader).result as string
    }
  }
  editItem(item: any) {
    this.editedIndex = this.goods.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialog = true
  }
  deleteItem(item: any) {
    const index = this.goods.indexOf(item)
    console.log(item.goodsId)
    this.axios.get(basicUrls.dev + "/shoppingCar/deleteShoppingCar?goodsId="
     + item.goodsId + "&userId=" + $up.getUserId).then(resp => {
      alert("删除成功")
    })
    confirm("你确定要删除吗？") && this.goods.splice(index, 1)
  }

  want(item: {
    goodsName: string,
    goodsId: number,
    ownerId: number,
    ownerName: string
  }) {
    console.log(item)
    console.log($up.getUserId)
    this.axios.post(basicUrls.dev + "/transaction/addTransaction", {
      goodsName: item.goodsName,
      goodsId: item.goodsId,
      sponsorId: $up.getUserId,
      receiverId: item.ownerId,
      receiverName: item.ownerName,
      sponsorName: $up.getUsername
    })
    alert("购入成功，等待对方确认...");
    this.dialog = false
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
  }

  close() {
    this.dialog = false
  }

  deliver(item: {
    goodsName: string,
    goodsId: number,
    ownerId: number,
    ownerName: string
  }) {
    alert("等待对方确认...")
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