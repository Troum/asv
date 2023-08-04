<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="page-frames publications-page" :style="`margin-top: ${frameMargin}px`">
      <template v-for="(publication, key) of publications.list.slice(0, current)" :key="key">
        <div class="publication">
          <publication-card-component :publication="publication"/>
        </div>
      </template>
    </v-col>
    <v-col cols="12" class="d-flex justify-center position-relative">
      <v-btn @click="loadMore" :ripple="false" variant="plain" style="opacity: 1;">
        <div class="d-flex align-center justify-center flex-column flex-row-gap-5">
          <span class="font-weight-bold">Загрузить еще</span>
          <chevron-down />
        </div>
      </v-btn>
    </v-col>
  </v-container>
</template>

<script setup>
import PublicationCardComponent from "~/components/PublicationCardComponent.vue";
import ChevronDown from "~/components/icons/chevronDown.vue";
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
const {find} = useStrapi()
const current = ref(3)
const publications = usePublicationsStore()
const loadMore = () => {
  if (current.value < publications.list.length) {
    current.value += 3
  }
}
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
