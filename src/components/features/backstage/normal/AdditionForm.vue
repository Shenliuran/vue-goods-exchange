<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
        <v-card
          raised
          elevation="24"
        >
        <v-card-title
          id="title"
        >
          <v-spacer/>
          Add Your Goods
          <v-spacer/>
        </v-card-title>
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex 
                xs12
                md4
              >
                <v-file-input
                  type="file"
                  id="input"
                  messages="choose only one picture"
                  clearable
                  @change="echo"
                ></v-file-input>
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <div class="image_frame">
                  <img src="" id="echo"/>
                </div>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex
                xs12
                md3
              >
                <v-text-field
                  label="Goods Name"
                  class="purple-input"
                  v-model="goodsName"
                />
              </v-flex>
              <v-flex><v-spacer/></v-flex>
              <v-flex
                xs12
                md3
              >
                <v-select
                  :items="categories"
                  chips
                  label="Categroy"
                  v-model="choises"
                  multiple
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex
              xs12
              md6
            >
              <v-input
                disabled
              >
                Description
              </v-input>
              <v-textarea
                aria-multiline
                v-model="description"
              />
            </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex><v-spacer/></v-flex>
              <v-btn @click="submit">SUBMIT</v-btn>
              <v-flex><v-spacer/></v-flex>
            </v-layout>
          </v-container>
        </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AdditionForm extends Vue {
  categories: string[] = ['Book', "Digital", "Health/Makeup", "Clothes", "Sports", "Foods"]
  goodsName: string = ""//the goods' name
  choises: string = ""//the goods categories choosed by user
  photo: string = ""// the photo choosed by user
  description: string = ""// the goods' description
  time!: Date

  submit() {
    this.time = new Date()
  }
  //echo the local photo
  echo() {
    let image = (((document.getElementById("input") as HTMLInputElement).files as FileList)[0] as Blob)
    let reader = new FileReader();
    reader.readAsDataURL(image)
    let that = this
    reader.onload = function (e) {
      ((document.getElementById("echo") as HTMLImageElement).src as String) = ((e.target as FileReader).result as String)
      that.photo = (e.target as FileReader).result as string
    }
  }
}
</script>

<style scoped>
  #echo {
    height: inherit;
    width: inherit;
  }
  .image_frame {
    border: 1px dashed;
    height: 150px;
    width: 150px;
  }
</style>
