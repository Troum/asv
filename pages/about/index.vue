<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="mx-0 position-relative page-frames"
           :style="`margin-top: ${frameMargin}px`">
      <v-card flat style="padding-top: 60px; padding-bottom: 60px">
        <v-card-title tag="h1" class="text-uppercase font-size-36 px-0 text-pre-wrap">
          {{  page.title }}
        </v-card-title>
        <v-card-subtitle tag="h4" class="text-uppercase font-size-18 px-0 text-pre-wrap mt-5" style="color: #333">
          {{ page.subtitle }}
        </v-card-subtitle>
        <v-card-text class="px-0">
          <nuxt-img provider="strapi" style="width: 100%" class="my-5" :src="page.image"></nuxt-img>
          <article v-html="page.description"></article>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<script setup>
import {useCommonStore} from "~/store/common";
import {ref} from "vue"
defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})
definePageMeta({
  breadcrumb: 'О компании'
})
const page = ref({})
const {find} = useStrapi()
const commonStore = useCommonStore()
await find('about', {populate: 'image'})
    .then((response) => {
      page.value = {
        title: response.data.attributes.title,
        subtitle: response.data.attributes.subtitle,
        description: response.data.attributes.description,
        image: response.data.attributes.image.data.attributes.url,
      }
    })
commonStore.setComponent({
  content: 'СООО «АСВ Трейд Сервис» – ведущий белорусский дистрибьютор профессионального медицинского оборудования. Наша компания занимается поставкой оборудования под известными марками, производители которого являются лидерами в своей области. Вся продукция соответствует самым высоким требованиям и произведена в таких странах, как Япония, США, Франция, Германия, Израиль, Испания и др.',
  logo: '/logo-w.svg'
})
commonStore.setTitle(null)
</script>

<style lang="scss" scoped>

</style>
