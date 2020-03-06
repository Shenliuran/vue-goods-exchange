<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        v-for="(item, i) in goods"
        :key="i"
      >
        <v-card
          class="card"
          style="width: 135px; height: 250px;"
          raised
          elevation="24"
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
                <p>{{item.date}}</p>
              </span>
            </v-tooltip>
          </v-card-title>
          <v-card-text>
            <div>
              {{item.title}}
            </div>
            <div>
              {{item.author}}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn icon><v-icon>mdi-sticker-check</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
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
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component
export default class GoodsSet extends Vue {
  page: number = 1
  pageSize: number = 18
  goods: Array<{id: number, title: string, author: string, picture: string}> = []
  created() {
    this.axios.get('http://localhost:8181/goods/findAll?page=0&size=' + this.pageSize).then(response => {
      this.goods = response.data
    })
  }
  pageChange(currentPage: number) {
    this.axios.get('http://localhost:8181/goods/findAll?page=' + (currentPage - 1) + '&size=' + this.pageSize).then(response => {
      this.goods = response.data
    })
  }
}
</script>

<style scoped>
  .cover {
    width: 110px;
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