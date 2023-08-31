<template>
  <v-container :fluid="true" class="mx-0 pa-0">
    <v-row class="pa-0" :style="`margin-top: ${frameMargin}px`">
      <template v-if="timeout">
        <v-col cols="12" class="d-flex mx-0 position-relative pb-4 pt-8" :class="{'page-frames': !mobile, 'px-6': mobile}">
          <span class="display-3">{{ $t('loading') }}</span>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="12" class="mx-0 position-relative" :class="{'page-frames': !mobile, 'px-6': mobile}">
          <template v-if="filters.length">
            <v-row class="ma-0 pa-0">
              <v-col cols="12" class="mx-0 position-relative px-0">
                <filters-component @set-filter="filterData" :filters="filters"/>
              </v-col>
            </v-row>
          </template>
          <template v-if="products.length">
            <v-row class="ma-0 pa-0">
              <v-col cols="12" class="ma-0 position-relative d-grid products-list grid-column-gap-30 grid-row-gap-40 px-0">
                <template v-for="product of filteredProducts.slice(0, current)">
                  <product-card-component :product="product"/>
                </template>
              </v-col>
              <template v-if="products.length > 6">
                <v-col cols="12" class="d-flex justify-center position-relative">
                  <v-btn @click="loadMore" :ripple="false" variant="plain" style="opacity: 1;">
                    <div class="d-flex align-center justify-center flex-column flex-row-gap-5">
                      <span class="font-weight-bold">{{ $t('buttons.loadAll') }}</span>
                      <chevron-down/>
                    </div>
                  </v-btn>
                </v-col>
              </template>
            </v-row>
          </template>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script setup>
import {ref, onBeforeMount, watch} from "vue";
import _ from "lodash";
import {useCommonStore} from "~/store/common";
import ChevronDown from "~/components/icons/chevronDown.vue";
import Product from "~/models/Product";
import Filter from "~/models/Filter";
import {useI18n} from "vue-i18n";
import {useLangStore} from "~/store/lang";
import {useFiltersStore} from "~/store/filters";
import {useDisplay} from "vuetify";

definePageMeta({
  breadcrumb: 'pages.catalog.title'
})

defineProps({
  frameMargin: {
    type: Number,
    default: 0
  },
})
const timeout = ref(true)
const langStore = useLangStore()
const { locale } = useI18n()
const { mobile } = useDisplay()

const {find} = useStrapi()
const commonStore = useCommonStore()
const products = ref([])
const filters = ref([])
const current = ref(6)
const filtered = ref([])
const filtersStore = useFiltersStore()

onBeforeMount(async () => {
  await find('catalog', {
    populate: {
      products: {populate: ['logo', 'video', 'avatar']},
      filters: {fields: ['title', 'value']}
    },
    locale: langStore.getLang ?? locale.value
  }).then((response) => {
    products.value = response.data.attributes.products.data.map((item) => {
      return new Product(
          item.id,
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
    filters.value = response.data.attributes.filters.data.map((item) => {
      return new Filter(
          item.attributes.value,
          item.attributes.title
      ).toJson()
    })
    filtersStore.addItems(filters.value)
    commonStore.setServiceFilter(null)
    commonStore.setComponent(null)
    commonStore.setTitle(null)
    timeout.value = false
  })
})

const filteredProducts = computed(() => {
  return !_.isEmpty(filtered?.value) ? filtered?.value : products.value
})
const filterData = (value) => {
  if (!_.isEqual(value, 'all')) {
    filtered.value = products.value.filter((item) => item.type === value)
  } else {
    filtered.value = products.value
  }
}
const loadMore = () => {
  current.value = products.value.length
}
watch(locale, async (value) => {
  timeout.value = true
  await find('catalog', {
    populate: {
      products: {populate: ['logo', 'video', 'avatar']},
      filters: {fields: ['title', 'value']}
    },
    locale: langStore.getLang ?? value
  }).then((response) => {
    products.value = response.data.attributes.products.data.map((item) => {
      return new Product(
          item.id,
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
    filters.value = response.data.attributes.filters.data.map((item) => {
      return new Filter(
          item.attributes.value,
          item.attributes.title
      ).toJson()
    })
    filtersStore.addItems(filters.value)
    commonStore.setServiceFilter(null)
    commonStore.setComponent(null)
    commonStore.setTitle(null)
    timeout.value = false
  })
})
</script>
<style scoped lang="scss">
.products {
  &-list {
    grid-template-columns: repeat(3, calc((100% / 3) - 60px));
    grid-auto-rows: minmax(700px, 1fr);

    @media (max-width: 1280px) {
      grid-template-columns: repeat(1, 1fr);
      grid-auto-rows: minmax(500px, 1fr);
    }
  }
}
</style>
