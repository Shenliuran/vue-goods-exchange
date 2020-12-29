<template>
  <v-data-table
    :headers="headers"
    :items="history"
   class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          交易历史
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <span>无数据</span>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component} from "vue-property-decorator"
import { DataTableHeader } from 'vuetify'
import { basicUrls } from '../../../../api/urls'
import { getModule } from 'vuex-module-decorators'
import UserProfile from '../../../../store/modules/userProfile'

const $up = getModule(UserProfile)
@Component
export default class History extends Vue {
  search: string = ""
  headers: DataTableHeader[] = [
    { text: "物品名称", value: "goodsName" },
    { text: '购入', value: 'sponsorName' },
    { text: "原拥有者", value: "receiverName" },
    { text: "删除", value: "action", sortable: false}
  ]
  history: [{
    transactionId: number,
    goodsName: string,
    sponsorName: string,
    receiverName: string
  }] = [{
    transactionId: -1,
    goodsName: "",
    receiverName: "",
    sponsorName: ""
  }]
  beforeCreate() {
    this.axios.get(basicUrls.dev + "/transaction/allTransaction").then(response => {
      let buf: Array<{
        transactionId: number,
        goodsName: string,
        goodsId: number,
        sponsorId: number,
        sponsorName: string,
        receiverId: number,
        receiverName: string
      }> = response.data
      buf.forEach(elem => {
        this.history.push({
          transactionId: elem.transactionId,
          goodsName: elem.goodsName,
          sponsorName: elem.sponsorName,
          receiverName: elem.receiverName
        })
      })
    })
  }

  deleteItem(item: any) {
    const index = this.history.indexOf(item)
    this.axios.post(basicUrls.dev + "/transaction/deleteTransactionByTransactionId", {
      transactionId: item.transactionId
    }).then(response => {
      if (response.data == "0") alert("删除失败")
      else alert("删除成功")
    })
  }
}
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>