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
          Selling History
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

  <v-data-table
    :headers="buyHeaders"
    :items="historyForBuying"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          Buying History
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
    { text: "Goods Name", value: "goodsName" },
    { text: 'Buyer', value: 'sponsorName' },
  ]
  sellHeaders: DataTableHeader[] = [
    { text: "Goods Name", value: "goodsName" },
    { text: "Ex-owner Name", value: "receiverName" }
  ]
  historyForBuying: [{
    goodsName: string,
    sponsorName: string
  }] = [{
    goodsName: "",
    sponsorName: ""
  }]
  historyForSelling: [{
    goodsName: string,
    receiverName: string
  }] = [{
    goodsName: "",
    receiverName: ""
  }]
  beforeCreate() {
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
      }> = response.data
      buf.forEach(elem => {
        this.historyForBuying.push({
          goodsName: elem.goodsName,
          sponsorName: elem.receiverName
        })
      })
    })
    this.axios.get(basicUrls.dev + "/transaction/getTransactionBySponsorId?"
    + "sponsorId=" + $up.getUserId).then(response => {
      let buf: Array<{
        transactionId: number,
        goodsName: string,
        goodsId: number,
        sponsorId: number,
        sponsorName: string,
        receiverId: number,
        receiverName: string
      }> = response.data
      console.log("buf: " + buf)
      buf.forEach(elem => {
        this.historyForSelling.push({
          goodsName: elem.goodsName,
          receiverName: elem.receiverName
        })
      })
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