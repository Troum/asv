<template>
  <v-container :fluid="true" class="mx-0 pa-0">
    <template v-if="timeout">
      <v-col cols="12" class="d-flex mx-0 position-relative page-frames" :style="`margin-top: ${frameMargin}px`">
        <span class="display-3">Подождите, идет загрузка...</span>
      </v-col>
    </template>
    <template v-else>
      <client-only>
        <v-col cols="12" class="mx-0 position-relative page-frames" :style="`margin-top: ${frameMargin}px`">
          <template v-if="filters.list.length">
            <v-row class="ma-0 pa-0">
              <v-col cols="12" class="mx-0 position-relative px-0">
                <filters-component @set-filter="filterData" :filters="filters.list"/>
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

  </v-container>
</template>
<script setup>
import {useProductsStore} from "~/store/products";
import {useFiltersStore} from "~/store/filters";
import {ref, computed, onBeforeMount} from "vue";
import _ from "lodash";
import {useCommonStore} from "~/store/common";
import {useRoute} from "vue-router";
import ChevronDown from "~/components/icons/chevronDown.vue";
import {useServicesStore} from "~/store/services";
import Product from "~/models/Product";

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
const services = useServicesStore()
const filters = useFiltersStore()
const page = ref({
  title: null,
  description: null,
  logo: ''
})

const current = ref(6)
const filtered = ref([])

const service = computed(() => {
  return _(services.list)
      .map('slides')
      .flatten()
      .find({slug: route.params.slug})
})
const timeout = ref(true)

onBeforeMount(async () => {
  await find(`slides/${service.value.id}`, {populate: {
      whiteLogo: {
        fields: ['url']
      },
      products: {
        populate: {
          logo: {
            fields: ['url']
          },
          avatar: {
            fields: ['url']
          }
        }
      }
    }}).then((response) => {

    page.value.title = response.data.attributes.name
    page.value.description = response.data.attributes.description
    page.value.logo = `https://dashboard.a-sv.site${response.data.attributes.whiteLogo.data.attributes.url}`

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
</script>
<style scoped lang="scss">
.products {
  &-list {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(700px, 1fr);
  }
}
</style>
