<template>
  <v-container :fluid="true" class="mx-0 pa-0">
    <v-col cols="12" class="mx-0 position-relative page-frames" :style="`margin-top: ${frameMargin}px`">
      <template v-if="filters.list.length">
        <v-row class="ma-0 pa-0">
          <v-col cols="12" class="mx-0 position-relative px-0">
            <filters-component @set-filter="filterData" :filters="filters.list"/>
          </v-col>
        </v-row>
      </template>
      <template v-if="products.list.length">
        <v-row class="ma-0 pa-0">
          <v-col cols="12" class="ma-0 position-relative d-grid products-list grid-column-gap-30 grid-row-gap-40 px-0">
            <template v-for="product of filteredProducts.slice(0, current)">
              <product-card-component :product="product"/>
            </template>
          </v-col>
          <template v-if="products.list.length > 6">
            <v-col cols="12" class="d-flex justify-center position-relative">
              <v-btn @click="loadMore" :ripple="false" variant="plain" style="opacity: 1;">
                <div class="d-flex align-center justify-center flex-column flex-row-gap-5">
                  <span class="font-weight-bold">Загрузить еще</span>
                  <chevron-down />
                </div>
              </v-btn>
            </v-col>
          </template>
        </v-row>
      </template>
    </v-col>
  </v-container>
</template>
<script setup>
import {useProductsStore} from "~/store/products";
import {useFiltersStore} from "~/store/filters";
import {ref} from "vue";
import _ from "lodash";
import {useCommonStore} from "~/store/common";
import ChevronDown from "~/components/icons/chevronDown.vue";

definePageMeta({
  breadcrumb: 'Каталог'
})
defineProps({
  frameMargin: {
    type: Number,
    default: 0
  },
})
const commonStore = useCommonStore()
const products = useProductsStore()
const filters = useFiltersStore()

const current = ref(6)
const filtered = ref([])
const loading = ref(true)

commonStore.setComponent(null)
commonStore.setTitle(null)

const filteredProducts = computed(() => {
  return !_.isEmpty(filtered?.value) ? filtered?.value : products.list
})
const filterData = (value) => {
  if (!_.isEqual(value, 'all')) {
    filtered.value = products.list.filter((item) => item.type === value)
    noResults.value = _.isEmpty(filtered.value);
  } else {
    filtered.value = products.list
  }
}
const loadMore = () => {
  current.value = products.list.length
}
</script>
<style scoped lang="scss">
.products {
  &-list {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(700px, 1fr);
  }
}
</style>
