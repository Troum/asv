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
        <v-card-title tag="h1" class="text-uppercase font-size-36 px-0">Заголовок новости H1</v-card-title>
        <v-card-subtitle tag="h4" class="text-uppercase font-size-18 px-0" style="color: #333">
          подзаголовок новости h4 / 30.04.2023 - 19:30
        </v-card-subtitle>
        <v-card-text class="px-0">
          <nuxt-img class="my-10" src="/poster.png"></nuxt-img>
          <article v-html="publication"></article>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<script setup>
import {ref} from "vue"
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiChevronLeft} from "@mdi/js";
const {$event} = useNuxtApp()

defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})

$event('set:title', 'Заголовок новости H1')

const publication = ref('')

</script>

<style lang="scss" scoped>

</style>
