<template>
  <v-container :fluid="true" class="mx-0 pa-0">
    <v-row class="pa-0" :style="`margin-top: ${frameMargin}px`">
    <template v-if="timeout">
        <v-col cols="12" class="d-flex mx-0 position-relative pb-4 pt-8"
               :class="{'page-frames': !mobile, 'px-6': mobile}">
          <span class="display-3">{{ $t('loading') }}</span>
        </v-col>
    </template>
    <template v-else>
      <client-only>
        <v-col cols="12" class="mx-0 position-relative"
               :class="{'pb-4 pt-8': !(filters.list.length && products.length), 'page-frames': !mobile, 'px-6': mobile}">
          <template v-if="filters.list.length && products.length">
            <v-row class="ma-0 pa-0">
              <v-col cols="12" class="mx-0 position-relative px-0">
                <filters-component @set-filter="filterData" :filters="filters.list"/>
              </v-col>
            </v-row>
          </template>
          <template v-else>
            <v-row class="px-0 mx-0">
              <v-col cols="12" class="d-flex mx-0 position-relative">
                <span class="display-3">{{ $t('noProducts') }}</span>
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
                      <span class="font-weight-bold">Загрузить еще</span>
                      <chevron-down />
                    </div>
                  </v-btn>
                </v-col>
              </template>
            </v-row>
          </template>
        </v-col>
      </client-only>
    </template>
    </v-row>
  </v-container>
</template>
<script setup>
import {useFiltersStore} from "~/store/filters";
import {ref, computed, watch, onBeforeMount} from "vue";
import _ from "lodash";
import {useCommonStore} from "~/store/common";
import {useRoute} from "vue-router";
import ChevronDown from "~/components/icons/chevronDown.vue";
import Product from "~/models/Product";
import {useLangStore} from "~/store/lang";
import {useI18n} from "vue-i18n";
import Filter from "~/models/Filter";
import {useDisplay} from "vuetify";
const { locale } = useI18n()

defineProps({
  frameMargin: {
    type: Number,
    default: 0
  },
})
const {$event} = useNuxtApp()
const route = useRoute()
const {find} = useStrapi()
const commonStore = useCommonStore()
const products = ref([])
const filters = useFiltersStore()
const page = ref({
  title: null,
  description: null,
  logo: ''
})
const { mobile } = useDisplay()
const current = ref(6)
const filtered = ref([])

const timeout = ref(true)
const langStore = useLangStore()

onBeforeMount(async () => {
  await find(`slides/${route.params.slug}`, {
    locale: langStore.getLang ?? locale.value
  }).then((response) => {

    page.value.title = response.name
    page.value.description = response.description
    page.value.logo = response.whiteLogo.url

    products.value = response.products.map((item) => {
      return new Product(
          item.id,
          item.avatar.url,
          item.title,
          item.subtitle,
          item.description,
          item.logo.url,
          item.slug,
          item.type,
          item.video.url
      ).toJson()
    })
    filters.addItems(response.filters.map((item) => {
      return new Filter(
          item.value,
          item.title
      ).toJson()
    }))

    commonStore.setTitle(page.value.title)
    commonStore.setServiceFilter({value: page.value.title, title: page.value.title})

    commonStore.setComponent({
      content: page.value.description,
      logo: page.value.logo
    })
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
  await find(`slides/${route.params.slug}`, { locale: value}).then((response) => {

    page.value.title = response.name
    page.value.description = response.description
    page.value.logo = response.whiteLogo.url

    products.value = response.products.map((item) => {
      return new Product(
          item.id,
          item.avatar.url,
          item.title,
          item.subtitle,
          item.description,
          item.logo.url,
          item.slug,
          item.type,
          item.video.url
      ).toJson()
    })
    filters.addItems(response.filters.map((item) => {
      return new Filter(
          item.value,
          item.title
      ).toJson()
    }))
    commonStore.setTitle(page.value.title)
    commonStore.setServiceFilter({value: page.value.title, title: page.value.title})

    commonStore.setComponent({
      content: page.value.description,
      logo: page.value.logo
    })
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
