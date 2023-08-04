<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="page-frames publications-page" :style="`margin-top: ${frameMargin}px`">
    </v-col>
  </v-container>
</template>

<script setup>
import {ref} from "vue"
import {usePublicationsStore} from "~/store/publications";

definePageMeta({
  breadcrumb: 'Все новости'
})

defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})
const {$event} = useNuxtApp()

$event('set:component', null)
</script>

<style lang="scss" scoped>
.publications-page {
  display: flex;
  column-gap: 30px;
  row-gap: 30px;
  flex-wrap: wrap;
  padding-top: 60px;
  & .publication {
    flex: 0 0 calc(33.333% - 30px);
  }

}
</style>
