<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-snackbar color="info-darken" :rounded="0" v-model="noResults" location="top"
                :timeout="5000">
      <template v-slot:default>
        <div class="d-flex justify-center">
          Для данного фильтра нет результатов
        </div>
      </template>
      <template v-slot:actions>
        <v-btn
            icon
            color="#fff"
            variant="plain"
            style="opacity: 1"
            @click="noResults = false"
        >
          <svg-icon size="14" type="mdi" :path="mdiClose" />
        </v-btn>
      </template>
    </v-snackbar>
    <v-col cols="12" class="mx-0 position-relative page-frames" :style="`margin-top: ${frameMargin}px`">
      <filters-component @set-filter="filterData" :filters="filters"/>
    </v-col>
    <v-col cols="12" class="ma-0 position-relative d-grid products-list grid-column-gap-30 grid-row-gap-40 page-frames">
      <template v-for="product of filteredProducts.slice(0, current)">
        <product-card-component :product="product"/>
      </template>
    </v-col>
    <v-col cols="12" class="d-flex justify-center ma-0 position-relative">
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
import _ from "lodash"
import { ref } from "vue"
import FiltersComponent from "~/components/FiltersComponent.vue";
import ProductCardComponent from "~/components/ProductCardComponent.vue";
import ChevronDown from "~/components/icons/chevronDown.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiClose} from "@mdi/js";

definePageMeta({
  breadcrumb: 'Каталог'
})

const props = defineProps({
  frameMargin: {
    type: Number,
    default: 0
  },
  products: {
    type: Array,
    default: []
  },
  filters: {
    type: Array,
    default: []
  }
})

  const noResults = ref(false)
  const current = ref(6)
  const filtered = ref([])
  const filteredProducts = computed(() => {
    return !_.isEmpty(filtered.value) ? filtered.value : props.products
  })
  const filterData = (value) => {
    if (!_.isEqual(value, 'all')) {
      filtered.value = props.products.filter((item) => item.type === value)
      noResults.value = _.isEmpty(filtered.value);
    } else {
      filtered.value = props.products
    }
  }
  const loadMore = () => {
    current.value = props.products.length
  }
</script>

<style lang="scss" scoped>
.products {
  &-list {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(700px, 700px);
  }
}
</style>
