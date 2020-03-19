<template>
  <v-data-table
    :headers="headers"
    :items="history"
   class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          History
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
    { text: "Goods Name", value: "goodsName" },
    { text: 'Buyer', value: 'sponsorName' },
    { text: "Ex-owner Name", value: "receiverName" },
    { text: "Action", value: "action", sortable: false}
  ]
  history: [{
    transactionId: number,
    goodsName: string,
    sponsorName: string
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
      if (response.data == "0") alert("delete failed")
      else alert("delete success")
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