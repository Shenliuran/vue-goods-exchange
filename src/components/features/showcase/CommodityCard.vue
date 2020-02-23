<template>
  <div
    style="width = 100px"
  >
    <v-card
      v-for="(item, i) in commodity"
      :key="i"
      class="card"
      style="width: 135px; height: 250px;"
      raised
      elevation="24"
    >
      <v-card-title>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-img
              v-on="on"
              :src="item.cover"
              alt="封面"
            />
          </template>
          <span>
            <img :src="item.cover"/>
            <p>{{item.date}}</p>
          </span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <div class="title">
          {{item.title}}
        </div>
        <div>
          {{item.author}}
        </div>
      </v-card-text>
      <!-- <v-card-actions>
        <v-btn>
          want
        </v-btn>
      </v-card-actions> -->
    </v-card>
    <!-- <v-pagination
      @currentChange="handleCurrentChange"
      :currentPage="currentChange"
      :pageSize="pageSize"
      :total="commodity.length"
    >
    </v-pagination> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component
export default class CommodityCard extends Vue {
  commodity: any = [
    {
      cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
      title: '三体',
      author: '刘慈欣',
    },
    {
      cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
      title: '三体',
      author: '刘慈欣',
    }
  ]
}
</script>

<style scoped>
  .cover {
    width: 115px;
    height: 172px;
    margin: auto;
    cursor: pointer;
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
</style>