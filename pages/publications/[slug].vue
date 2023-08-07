<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="mx-0 position-relative page-frames" :style="`margin-top: ${frameMargin}px`">
      <v-card flat class="px-0" style="padding-top: 60px; padding-bottom: 60px">
        <v-card-title class="d-flex justify-end">
          <v-btn style="opacity: 1;" variant="plain"
                 :ripple="false"
                 class="d-flex align-center font-size-18 font-weight-bold">
            <svg-icon size="26" type="mdi" :path="mdiChevronLeft"/>
            <NuxtLink to="/publications" class="ml-4 text-decoration-none text-primary">Назад</NuxtLink>
          </v-btn>
        </v-card-title>
        <v-card-title tag="h1" class="text-uppercase font-size-36 px-0">{{ publication.title }}</v-card-title>
        <v-card-subtitle tag="h4" class="text-uppercase font-size-18 px-0" style="color: #333">
          {{ publication.subtitle }} / {{ publication.createdAt }}
        </v-card-subtitle>
        <v-card-text class="px-0">
          <nuxt-img provider="strapi" class="my-10" width="100%" :src="publication.image"></nuxt-img>
          <article class="text-body-1 text-primary" v-html="publication.article"></article>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<script setup>
import {ref} from "vue"
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiChevronLeft} from "@mdi/js";
import {useCommonStore} from "~/store/common";
import {useRoute, useRouter} from "vue-router";
import Publication from "~/models/Publication";
defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})
const route = useRoute()
const router = useRouter()
const {find} = useStrapi()
const commonStore = useCommonStore()
const publication = ref({})

await find(`publications/${route.params.slug}`, {populate: 'detailImage'})
    .then((response) => {
      publication.value = new Publication(
          response.data.id,
          response.data.attributes.title,
          response.data.attributes.subtitle,
          response.data.attributes.article,
          response.data.attributes['detailImage'].data.attributes.url,
          response.data.attributes.slug,
          response.data.attributes.createdAt
      )
    })

commonStore.setComponent(null)
commonStore.setTitle('Заголовок новости H1')

</script>

<style lang="scss" scoped>

</style>
