<template>
  <v-data-table
    :headers="headers"
    :items="goods"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          Management
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
                <v-text-field v-model="editedItem.goodsName" label="Goods Name"></v-text-field>
                <span>origin picture</span>
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
                  messages="choose only one picture"
                  @change="echo"
                >
                </v-file-input>
                <v-select
                  :items="categories"
                  chips
                  label="Category"
                  v-model="editedItem.category"
                ></v-select>
                <v-textarea
                  v-model="editedItem.description"
                  label="description"
                  aria-multiline
                ></v-textarea>
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
              <v-btn
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
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
  categories: string[] = ["Book", "Digital", "Health/Makeup", "Clothes", "Sports", "Foods" ]
  dialog: boolean = false
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
  headers: DataTableHeader[] = [
    { text: "Goods Name", align: "start", value: "goodsName" },
    // { text: "Picture", value: "picture" },
    { text: "Category", value: "category" },
    { text: "Wanted (Yes / No)", value: "isSelected" },
    { text: "Actions", value: "action", sortable: false }
  ]
  goods: Array<{
    goodsName: string,
    picture: string,
    category: string,
    description: string,
    isSelected: boolean
  }> = []

  beforeCreate() {
    this.axios.get(basicUrls.dev + "/goods/findGoodsByOwnerId?ownerId=" + $up.getUserId).then(response => {
      let buf: Array<any> = response.data
      buf.forEach(item => {
        this.goods.push({
          goodsName: item.goodsName,
          picture: item.picture,
          category: item.category,
          description: item.description,
          isSelected: item.isSelected
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
    this.axios.get(basicUrls.dev +
      "/goods/getGoodsId?goodsName=" + this.goods[index].goodsName +
      "&category=" + this.goods[index].category +
      "&ownerId=" + $up.getUserId).then(response => {
        this.axios.post(basicUrls.dev + "/goods/deleteGoodsByGoodsId", {
          goodsId: response.data
        }).then(resp => {
          resp.data == "1" ? alert("delete success") : alert("delete failed")
        })
      })
    confirm("Are you sure you want to delete this goods") && this.goods.splice(index, 1)
  }

  close() {
    this.dialog = false
  }
  save() {
    this.axios.get(basicUrls.dev +
      "/goods/getGoodsId?goodsName=" + this.goods[this.editedIndex].goodsName +
      "&category=" + this.goods[this.editedIndex].category +
      "&ownerId=" + $up.getUserId).then(response => {
        Object.assign(this.goods[this.editedIndex], this.editedItem)
        this.axios.post(basicUrls.dev + "/goods/updateGoods", {
          goodsName: this.goods[this.editedIndex].goodsName,
          category: this.goods[this.editedIndex].category,
          description: this.goods[this.editedIndex].description,
          picture: this.goods[this.editedIndex].picture,
          goodsId: response.data
        }).then(r => {
          if (r.data == "1")
            alert("save success")
          else
            alert("save failed")
        })
      })
    this.close()
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