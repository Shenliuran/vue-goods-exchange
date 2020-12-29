<template>
<v-container>
  <v-data-table
    :headers="sellHeaders"
    :items="historyForSelling"
   class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          换出历史
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
        @click="agree(item)"
      >同意</v-btn>
      <v-btn
        text
        small
        @click="disagree(item)"
      >拒绝</v-btn>
    </template>
    <template v-slot:no-data>
      <span>No Data</span>
    </template>
  </v-data-table>

  <v-data-table
    :headers="buyHeaders"
    :items="historyForBuying"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          换入历史
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
      <span>No Data</span>
    </template>
  </v-data-table>
</v-container>
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
  buyHeaders: DataTableHeader[] = [
    { text: "物品名称", value: "goodsName" },
    { text: "原拥有者", value: 'receiverName' },
    { text: "状态", value: 'status' }
  ]
  sellHeaders: DataTableHeader[] = [
    { text: "物品名称", value: "goodsName" },
    { text: "购入者", value: "sponsorName" },
    { text: "操作" , align: "center", value: "action" }
  ]
  historyForBuying: [{
    goodsName: string,
    receiverId: number,
    receiverName: string,
    status: string
  }] = [{
    goodsName: "",
    receiverId: -1,
    receiverName: "",
    status: ""
  }]
  historyForSelling: [{
    goodsName: string,
    sponsorId: number,
    sponsorName: string,
    goodsId: number,
  }] = [{
    goodsName: "",
    sponsorId: -1,
    goodsId: -1,
    sponsorName: ""
  }]
  beforeCreate() {
    this.axios.get(basicUrls.dev + "/transaction/getTransactionBySponsorId?"
    + "sponsorId=" + $up.getUserId).then(response => {
      let buf: Array<{
        transactionId: number,
        goodsName: string,
        goodsId: number,
        sponsorId: number,
        sponsorName: string,
        receiverId: number,
        receiverName: string,
        status: number
      }> = response.data
      buf.forEach(elem => {
        this.historyForBuying.push({
          goodsName: elem.goodsName,
          receiverId: elem.receiverId,
          receiverName: elem.receiverName,
          status: this.statusHelper(elem.status)
        })
      })
    })
    this.axios.get(basicUrls.dev + "/transaction/getTransactionByReceiverId?"
    + "receiverId=" + $up.getUserId).then(response => {
      let buf: Array<{
        transactionId: number,
        goodsName: string,
        goodsId: number,
        sponsorId: number,
        sponsorName: string,
        receiverId: number,
        receiverName: string
        status: number
      }> = response.data
      buf.forEach(elem => {
        this.historyForSelling.push({
          goodsName: elem.goodsName,
          sponsorId: elem.sponsorId,
          goodsId: elem.goodsId,
          sponsorName: elem.sponsorName
        })
      })
    })
  }
  statusHelper(status: number) {
    if (status == 0)
      return "未确认"
    else if (status == 1)
      return "同意"
    else
      return "拒绝"
  }
  agree(item: any) {
    console.log(item)
    const index = this.historyForSelling.indexOf(item)
    this.axios.get(basicUrls.dev + "/transaction/updateStatus?" +
      "status=1&" +
      "receiverId=" + $up.getUserId +
      "&sponsorId=" + this.historyForSelling[index].sponsorId).then(resp => {
        alert("您已同意")
        this.axios.get(basicUrls.dev + "/goods/updateIsSelected?goodsId="
          + this.historyForSelling[index].goodsId)
      })
  }
  disagree(item: any) {
    const index = this.historyForSelling.indexOf(item)
    this.axios.get(basicUrls.dev + "/transaction/updateStatus?" +
      "status=-1&" +
      "receiverId=" + $up.getUserId +
      "&sponsorId=" + this.historyForSelling[index].sponsorId).then(resp => {
        alert("您已拒绝")
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