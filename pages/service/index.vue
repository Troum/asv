<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="page-frames publications-page" :style="`margin-top: ${frameMargin}px`">
    </v-col>
  </v-container>
</template>

<script setup>
import {useCommonStore} from "~/store/common";

definePageMeta({
  breadcrumb: 'Все сервисы'
})

defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})
const commonStore = useCommonStore()
commonStore.setComponent(null)
commonStore.setTitle(null)
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
