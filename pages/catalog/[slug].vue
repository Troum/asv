<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-row class="pa-0" :style="`margin-top: ${frameMargin}px`">
      <template v-if="timeout">
        <v-col cols="12" class="d-flex mx-0 position-relative page-frames pb-4 pt-8">
          <span class="display-3">{{ $t('loading') }}</span>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="12" class="mx-0 position-relative" :class="{'page-frames': !mobile, 'px-6': mobile}">
          <template v-if="mobile">
            <div>
              <nuxt-img provider="strapi" :src="product.avatar[0].attributes.url" style="max-width: 320px"></nuxt-img>
              <v-card :rounded="0" :elevation="0">
                <v-card-subtitle class="font-size-18 font-weight-light px-0">{{ product.company }}</v-card-subtitle>
                <v-card-title class="font-size-24 font-weight-bold px-0">{{ product.title }}</v-card-title>
                <v-card-text class="font-size-18 font-weight-regular px-0" v-html="product.proclamation">
                </v-card-text>
                <v-card-actions class="px-0">
                  <v-btn @click="openRequestDialog" :rounded="0" width="160" height="50"
                         style="font-family: 'Open Sans Condensed Bold', sans-serif"
                         class="bg-primary text-white font-size-18 font-weight-bold">{{
                      $t('buttons.request')
                    }}
                  </v-btn>
                </v-card-actions>
                <v-card-actions class="px-0 d-flex justify-end">
                  <v-btn @click="router.back()"
                         style="opacity: 1; width: fit-content; height: fit-content"
                         class="d-flex" variant="plain"
                         :rounded="0" :ripple="false">
                    <svg-icon size="28" class="text-primary" type="mdi" :path="mdiChevronLeft"/>
                    <span class="font-weight-bold">{{ $t('buttons.back') }}</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-tabs
                  style="border-top: 1px solid #c4c4c4"
                  selected-class="font-weight-medium"
                  :ripple="false"
                  :hide-slider="true"
                  bg-color="transparent"
                  fixed-tabs
              >
                <v-tab @click="tab = 'description'" class="font-weight-light font-size-14" variant="plain" :rounded="0" :ripple="false"
                       style="opacity: 1; border-right: 1px solid #c4c4c4">
                  {{ $t('tabs.description') }}
                </v-tab>
                <v-tab @click="tab = 'characteristic'" class="font-weight-light font-size-14" variant="plain" :rounded="0" :ripple="false"
                       style="opacity: 1">
                  {{ $t('tabs.characteristics') }}
                </v-tab>
                <v-tab @click="tab = 'accessories'" class="font-weight-light font-size-14" variant="plain" :rounded="0" :ripple="false"
                       style="opacity: 1; border-left: 1px solid #c4c4c4">
                  {{ $t('tabs.accessories') }}
                </v-tab>
                <v-tab @click="tab = 'video'" class="font-weight-light font-size-14" variant="plain" :rounded="0" :ripple="false"
                       style="opacity: 1; border-left: 1px solid #c4c4c4">
                  {{ $t('tabs.video') }}
                </v-tab>
              </v-tabs>
              <v-window v-model="tab" style="grid-column: 1 / -1">
                <v-window-item
                    class="window_item"
                    v-for="(item, index) of tabs.slice(0, 2)"
                    :key="index"
                    :value="item.value"
                >
                  <v-card :flat="true">
                    <v-card-text v-html="item.html"></v-card-text>
                  </v-card>
                </v-window-item>
                <v-window-item
                    value="video"
                >
                  <v-card :flat="true">
                    <v-card-text class="px-0">
                      <video
                          controls
                          style="max-width: 100%"
                          preload="auto"
                          :src="`https://dashboard.a-sv.site${product.video}`"/>
                    </v-card-text>
                  </v-card>
                </v-window-item>
              </v-window>
            </div>
          </template>
          <template v-else>
            <div class="product-card" :style="`grid-template-columns: ${$display.width(display.width.value, 540)}px 1fr`">
              <div class="position-relative d-flex justify-center"
                  :style="`width: ${$display.width(display.width.value, 540)}px; height: ${$display.height(display.height.value, 540)}px; background-image: url('https://dashboard.a-sv.site${product.avatar[indexOfPhotos].attributes.url}'); background-size: contain; background-repeat: no-repeat; background-position: center center`"
              >
                <div class="position-absolute" style="bottom: 15px">
                  <v-btn @click="indexOfPhotos < (product.avatar.length - 1) ? indexOfPhotos++ : indexOfPhotos = 0"
                         class="pa-0 mr-3" max-width="50" height="50" :ripple="false" color="primary" icon>
                    <svg-icon :path="mdiChevronLeft" type="mdi"></svg-icon>
                  </v-btn>
                  <v-btn @click="indexOfPhotos > 0 ? indexOfPhotos-- : indexOfPhotos = (product.avatar.length - 1)"
                         class="pa-0 ml-3" max-width="50" height="50" :ripple="false" color="info" icon>
                    <svg-icon :path="mdiChevronRight" type="mdi" style="color: #ffffff"></svg-icon>
                  </v-btn>
                </div>
              </div>
              <v-card :rounded="0" :elevation="0">
                <v-card-subtitle class="font-size-18 font-weight-light px-0">{{ product.company }}</v-card-subtitle>
                <v-card-title class="font-size-24 font-weight-bold px-0">{{ product.title }}</v-card-title>
                <v-card-text class="font-size-18 font-weight-regular px-0" v-html="product.proclamation">
                </v-card-text>
                <v-card-actions class="px-0">
                  <v-btn @click="openRequestDialog" :rounded="0" width="160" height="50" class="bg-primary text-white">{{
                      $t('buttons.request')
                    }}
                  </v-btn>
                </v-card-actions>
                <v-card-actions class="px-0 d-flex justify-end align-self-end" style="position: absolute;bottom: 0;right: 0;">
                  <v-btn @click="router.back()"
                         style="opacity: 1; width: fit-content; height: fit-content"
                         class="d-flex" variant="plain"
                         :rounded="0" :ripple="false">
                    <svg-icon size="28" class="text-primary" type="mdi" :path="mdiChevronLeft"/>
                    <span class="font-weight-bold">{{ $t('buttons.back') }}</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-tabs
                  style="grid-column: 1 / -1; border-top: 1px solid #c4c4c4"
                  selected-class="font-weight-medium"
                  :ripple="false"
                  :hide-slider="true"
                  bg-color="transparent"
              >
                <v-tab @click="tab = 'description'" class="font-weight-light" variant="plain" :rounded="0" :ripple="false"
                       style="opacity: 1; border-right: 1px solid #c4c4c4">
                  {{ $t('tabs.description') }}
                </v-tab>
                <v-tab @click="tab = 'characteristic'" class="font-weight-light" variant="plain" :rounded="0" :ripple="false"
                       style="opacity: 1">
                  {{ $t('tabs.characteristics') }}
                </v-tab>
                <v-tab @click="tab = 'accessories'" class="font-weight-light" variant="plain" :rounded="0" :ripple="false"
                       style="opacity: 1; border-left: 1px solid #c4c4c4">
                  {{ $t('tabs.accessories') }}
                </v-tab>
                <v-tab @click="tab = 'video'" class="font-weight-light" variant="plain" :rounded="0" :ripple="false"
                       style="opacity: 1; border-left: 1px solid #c4c4c4">
                  {{ $t('tabs.video') }}
                </v-tab>
              </v-tabs>
              <v-window v-model="tab" style="grid-column: 1 / -1">
                <v-window-item
                    class="window_item"
                    v-for="(item, index) of tabs.slice(0, 3)"
                    :key="index"
                    :value="item.value"
                >
                  <v-card :flat="true">
                    <v-card-text v-html="item.html"></v-card-text>
                  </v-card>
                </v-window-item>
                <v-window-item
                    value="video"
                >
                  <v-card :flat="true">
                    <v-card-text class="px-0">
                      <video
                          style="max-width: 100%"
                          controls
                          preload="auto"
                          :src="`https://dashboard.a-sv.site${product.video}`"/>
                    </v-card-text>
                  </v-card>
                </v-window-item>
              </v-window>
            </div>
          </template>
        </v-col>
        <v-col cols="12" class="d-flex justify-center align-center flex-column pb-0" :class="{'page-frames': !mobile, 'px-6': mobile}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="4" viewBox="0 0 16 4" fill="none">
            <rect width="3.2" height="3.2" fill="black"/>
            <rect x="6.39844" width="3.2" height="3.2" fill="black"/>
            <rect x="12.7969" width="3.2" height="3.2" fill="black"/>
          </svg>
        </v-col>
        <v-col cols="12" class="page-frames" :class="{'page-frames': !mobile, 'px-6': mobile}">
          <v-divider/>
        </v-col>
      </template>
    </v-row>
  </v-container>
  <product-request-dialog :status="requestDialog" @close-dialog="closeRequestDialog"/>
</template>

<script setup>
import {ref, watch, onBeforeMount} from "vue";
import {useDisplay} from "vuetify";
import {mdiChevronLeft, mdiChevronRight} from "@mdi/js";
import {useRoute, useRouter} from "vue-router";
import SvgIcon from "@jamescoyle/vue-icon";
import {useCommonStore} from "~/store/common";
import Product from "~/models/Product";
import {useI18n} from "vue-i18n";
import {useLangStore} from "~/store/lang";
import ProductRequestDialog from "~/components/ProductRequestDialog.vue";

defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})
const requestDialog = ref(false)
const {locale} = useI18n()
const commonStore = useCommonStore()
const route = useRoute()
const router = useRouter()
const {$event, $display} = useNuxtApp()
const {find} = useStrapi()
const display = useDisplay()
const { mobile } = useDisplay()
const tab = ref('')
const tabs = ref([])
const product = ref({})
const langStore = useLangStore()
const timeout = ref(true)
const indexOfPhotos = ref(0)

const replace = (html) => {
  const container = document.createElement('div')
  container.innerHTML = html
  container.querySelectorAll('img').forEach((img) => {
    img.src = `https://dashboard.a-sv.site${img.src}`
  })
  return container.innerHTML
}

onBeforeMount(async () => {
  await find(`products/${route.params.slug}`, {
    populate: ['video', 'logo', 'avatar'],
    locale: langStore.getLang ?? locale.value
  })
      .then((response) => {
        product.value = new Product(
            response.data.id,
            response.data.attributes.avatar.data,
            response.data.attributes.title,
            response.data.attributes.subtitle,
            response.data.attributes.description,
            response.data.attributes.logo.data.attributes.url,
            response.data.attributes.slug,
            response.data.attributes.type,
            response.data.attributes.video.data.attributes.url,
            response.data.attributes.company,
            response.data.attributes.proclamation,
            response.data.attributes.characteristic,
            response.data.attributes.accessories,
        ).toJson()

        Array.from(['description', 'characteristic', 'accessories'])
            .forEach((item) => {
              tabs.value.push({
                value: item,
                html: product.value[item]
              })
            })
        commonStore.setTitle(product.value['title'])
        timeout.value = false
      })
})

watch(locale, async () => {
  timeout.value = true
  await find(`products/${route.params.slug}`, {
    populate: ['video', 'logo', 'avatar'],
    locale: langStore.getLang ?? locale.value
  })
      .then((response) => {
        tabs.value = []
        product.value = new Product(
            response.data.id,
            response.data.attributes.avatar.data,
            response.data.attributes.title,
            response.data.attributes.subtitle,
            response.data.attributes.description,
            response.data.attributes.logo.data.attributes.url,
            response.data.attributes.slug,
            response.data.attributes.type,
            response.data.attributes.video.data.attributes.url,
            response.data.attributes.company,
            response.data.attributes.proclamation,
            response.data.attributes.characteristic,
            response.data.attributes.accessories,
        ).toJson()
        Array.from(['description', 'characteristic', 'accessories'])
            .forEach((item) => {
              tabs.value.push({
                value: item,
                html: product.value[item]
              })
            })
        commonStore.setTitle(product.value['title'])
        timeout.value = false
      })
})
commonStore.setComponent(null)
const openRequestDialog = () => {
  requestDialog.value = true
}
const closeRequestDialog = () => {
  requestDialog.value = false
}
</script>

<style lang="scss" scoped>
.window_item {
  &:deep(img) {
    display: block;
    height: fit-content;
    max-width: 320px;
  }
}

.product-card {
  display: grid;
  grid-auto-rows: max-content;
  grid-column-gap: 30px;
}
</style>
