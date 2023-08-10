<template>
  <!--<template v-else>
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
    </template>-->
  <v-container :fluid="true" class="mx-0 pa-0" :style="`margin-top: ${frameMargin}px`">
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
          <svg-icon size="14" type="mdi" :path="mdiClose"/>
        </v-btn>
      </template>
    </v-snackbar>
    <v-col cols="12" class="mx-0 position-relative page-frames">
      <filters-component @set-filter="filterData" :filters="filters.list"/>
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
          <chevron-down/>
        </div>
      </v-btn>
    </v-col>
  </v-container>
</template>

<script setup>
import _ from "lodash"
import {ref} from "vue"
import FiltersComponent from "~/components/FiltersComponent.vue";
import ProductCardComponent from "~/components/ProductCardComponent.vue";
import ChevronDown from "~/components/icons/chevronDown.vue";
import {mdiClose} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import {useFiltersStore} from "~/store/filters";
import {useProductsStore} from "~/store/products";
import Filter from "~/models/Filter";
import Product from "~/models/Product";
import {useCommonStore} from "~/store/common";

definePageMeta({
  breadcrumb: 'Каталог'
})

const props = defineProps({
  frameMargin: {
    type: Number,
    default: 0
  },
})

const {find} = useStrapi()

const noResults = ref(false)
const current = ref(6)
const filtered = ref([])
const commonStore = useCommonStore()
const filters = useFiltersStore()
const products = useProductsStore()

commonStore.setComponent(null)
commonStore.setTitle(null)

await find('catalog', {
  populate:
      {
        products: {
          populate: ['logo', 'video', 'avatar']
        },
        filters: {
          fields: ['title', 'value']
        }
      }
})
    .then((response) => {
      products.addItems(
          response.data.attributes.products.data.map((item) => {
            return new Product(
                item.attributes.avatar.data.attributes.url,
                item.attributes.title,
                item.attributes.subtitle,
                item.attributes.description,
                item.attributes.logo.data.attributes.url,
                item.attributes.slug,
                item.attributes.type,
                item.attributes.logo.data.attributes.video
            ).toJson()
          })
      )
      filters.addItems(response.data.attributes.filters.data.map((item) => {
        return new Filter(
            item.attributes.value,
            item.attributes.title
        ).toJson()
      }))
    })

const filteredProducts = computed(() => {
  return !_.isEmpty(filtered.value) ? filtered.value : products.list
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

<style lang="scss" scoped>
.products {
  &-list {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(700px, 1fr);
  }
}
</style>
