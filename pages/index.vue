<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <v-col cols="12" class="ma-0 pa-0 position-relative">
        <client-only>
          <carousel-component ref="slideComponent" :slides="mainPageCarousel.list"/>
          <slide-group-component :height="slideGroupHeight" :slides="services.list"
                                 class="position-absolute"
                                 :is-index="isIndex"
                                 :style="`top: ${height - (orientation === 'landscape-primary' ? -15 : 20)}px; left: 0; right: 0;`"/>
        </client-only>
      </v-col>
      <v-col cols="10" class="d-flex flex-column pa-0 mx-auto position-relative"
             :class="{'flex-row-gap-46': !mobile}"
             :style="`margin-top: ${slideGroupHeight + (orientation === 'landscape-primary' && mobile ? 250 : 40)}px; font-family: 'Arial', sans-serif`">
        <h2 class="text-uppercase text-center font-size-48" :class="{ 'mb-16': mobile }" v-html="$t('mainPage.about.title')"></h2>
        <template v-if="!mobile">
          <div class="position-relative py-0">
            <div class="d-flex flex-column justify-center align-start w-50 pa-10 text-white position-absolute fill-height"
                 :style="`background-color: rgba(0, 0, 0, .8); row-gap: ${$display.height(display.height.value, 40)}px`">
              <h3 class="text-uppercase font-weight-bold font-size-21" v-html="$t('mainPage.about.title')">
              </h3>
              <article class="font-weight-medium" v-html="$t('mainPage.about.description')">
              </article>
            </div>
            <img alt="Doctor" style="object-fit: fill; width: 100%; height: 100%" src="/doctor.jpeg"/>
          </div>
          <div class="about font-size-16">
            <article class="text-center" v-html="$t('mainPage.about.articles.first')">
            </article>
            <article class="text-center" v-html="$t('mainPage.about.articles.second')">
            </article>
            <article class="text-center" v-html="$t('mainPage.about.articles.third')">
            </article>
          </div>
          <div class="d-flex justify-center align-center w-100">
            <v-btn :height="50" :width="160" style="font-family: 'Open Sans Condensed Bold', sans-serif" class="rounded-0 mx-auto bg-primary" variant="tonal" to="/about">
              <span class="text-white font-weight-bold">{{ $t('buttons.details') }}</span>
            </v-btn>
          </div>
        </template>
        <template v-else>
          <div class="d-flex flex-column justify-center align-start w-100 pa-10 text-white fill-height"
               :style="`background-color: rgba(0, 0, 0, .8); row-gap: ${$display.height(display.height.value, 40)}px`">
            <h3 class="text-uppercase font-weight-bold font-size-21" v-html="$t('mainPage.about.title')">
            </h3>
            <article class="font-weight-medium" v-html="$t('mainPage.about.description')">
            </article>
          </div>
          <img alt="Doctor" class="d-block" src="/doctor-mobile.jpg"/>
          <article class="text-center font-size-16 mt-8" v-html="$t('mainPage.about.articles.first')">
          </article>
          <article class="text-center font-size-16 my-8" v-html="$t('mainPage.about.articles.second')">
          </article>
          <article class="text-center font-size-16" v-html="$t('mainPage.about.articles.third')">
          </article>
        </template>
      </v-col>
      <v-col cols="10" class="d-flex flex-column pa-0 mx-auto position-relative"
             :style="`margin-top: ${orientation === 'landscape-primary' && mobile ? 40 : slideGroupHeight - 40}px; row-gap: 48px; font-family: 'Arial', sans-serif`">
        <h2 class="text-uppercase text-center font-size-48" v-html="$t('mainPage.service.title')"></h2>
        <template v-if="mobile">
          <div class="d-flex flex-column pa-4 text-center flex-row-gap-40">
            <article>
              {{ $t('mainPage.service.articles.first') }}
            </article>
            <article>
              {{ $t('mainPage.service.articles.second') }}
            </article>
            <article v-html="$t('mainPage.service.articles.third.content', {address: 'info', domain: 'asvtrade.by', link: 'mailto:info@asvtrade.by'})">
            </article>
            <article>
              {{ $t('mainPage.service.articles.fourth') }}
            </article>
          </div>
          <div class="position-relative"
               style="background: url('/banner.jpg') top center no-repeat; background-size: cover; width: 100%; padding: 60px">
            <div class="d-flex flex-column justify-center align-start text-white z-index-2 position-relative"
                 :style="`row-gap: ${$display.height(display.height.value, 40)}px`">
              <h3 class="text-uppercase font-weight-bold font-size-21 letter-spacing-21"
                  v-html="$t('mainPage.service.articles.list.title')"></h3>
              <ul>
                <template v-for="(item, index) of tm('mainPage.service.articles.list.items')" :key="index">
                  <li :class="{ 'my-4': index !== 0 && index + 1 !== tm('mainPage.service.articles.list.items').length  }">
                    {{ item }}
                  </li>
                </template>
              </ul>
            </div>
            <div style="position: absolute; width: 100%; top: 0; bottom: 0; right: 0; background: rgba(0, 0, 0, .8);"
                 class="z-index-1"></div>
          </div>
        </template>
        <template v-else>
          <div class="service">
            <div class="d-flex flex-column pa-16 text-center flex-row-gap-40">
              <article>
                {{ $t('mainPage.service.articles.first') }}
              </article>
              <article>
                {{ $t('mainPage.service.articles.second') }}
              </article>
              <article v-html="$t('mainPage.service.articles.third.content', {address: 'info', domain: 'a-sv.site', link: 'mailto:info@a-sv.site'})">
              </article>
              <article>
                {{ $t('mainPage.service.articles.fourth') }}
              </article>
            </div>
            <div class="position-relative"
                 style="background: url('/banner.jpg') top center no-repeat; background-size: cover; width: 100%; padding: 80px">
              <div class="d-flex flex-column justify-center align-start text-white z-index-2 position-relative"
                   :style="`row-gap: ${$display.height(display.height.value, 40)}px`">
                <h3 class="text-uppercase font-weight-bold font-size-21 letter-spacing-21"
                    v-html="$t('mainPage.service.articles.list.title')"></h3>
                <ul>
                  <template v-for="(item, index) of tm('mainPage.service.articles.list.items')" :key="index">
                    <li :class="{ 'my-4': index !== 0 && index + 1 !== tm('mainPage.service.articles.list.items').length  }">
                      {{ item }}
                    </li>
                  </template>
                </ul>
              </div>
              <div class="overlay z-index-1"></div>
            </div>
          </div>
        </template>
      </v-col>
      <v-col cols="10" class="d-flex flex-column pa-0 mx-auto position-relative"
             :style="`margin-top: ${orientation === 'landscape-primary' ? 40 : (slideGroupHeight - mobile ? 10 : 0)}px;margin-bottom: ${slideGroupHeight}px; font-family: 'Arial', sans-serif`">
        <div class="d-flex justify-space-between align-center mb-15">
          <h2 class="text-uppercase text-left text-lg-center font-size-48" v-html="$t('titles.news')"></h2>
          <v-btn style="opacity: 1; font-family: 'Open Sans Condensed Bold', sans-serif" variant="plain"
                 :ripple="false"
                 class="d-flex align-center font-size-18 font-weight-bold">
            <NuxtLink to="/publications" class="mr-4 text-decoration-none text-primary">{{ $t('buttons.all') }}</NuxtLink>
            <svg-icon size="26" type="mdi" :path="mdiChevronRight"/>
          </v-btn>
        </div>
        <client-only>
          <template v-if="mobile">
            <template v-if="publications.list.slice(0, current).length > 2">
              <div ref="scrollContainer" class="d-flex align-center justify-space-between flex-column-gap-35 mobile_slider"
                   :style="`scroll-snap-type: x mandatory; position: relative; overflow-x: scroll; width: 120%; margin-left:-10%`">
                <template v-for="(publication, index) of publications.list.slice(0, current)"
                          :key="index" class="pa-0">
                  <div :style="`flex: 0 0 auto; width: ${width / 1.5}px; scroll-snap-align: center;`">
                    <publication-card-component :publication="publication"/>
                  </div>
                </template>
              </div>
            </template>
            <template v-else>
              <div style="position: relative;" class="d-flex justify-center w-full">
                <publication-card-component :publication="publications.list[0]"/>
              </div>
            </template>
          </template>
          <template v-else>
            <div class="publications">
              <template v-for="(publication, key) of publications.list.slice(0, xxl ? 4 : 3)" :key="key">
                <publication-card-component :publication="publication"/>
              </template>
            </div>
          </template>
        </client-only>
      </v-col>
      <v-col cols="12" :class="`pa-0 mx-auto position-relative mb-4 ${orientation === 'landscape-primary' ? 'mt-16' : 'mt-7'}`" style="font-family: 'Arial', sans-serif">
        <h2 class="text-uppercase text-center font-size-48" v-html="$t('titles.clients')"></h2>
        <client-only>
          <client-slider :current="current" :clients="clients.list"/>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref, watch, onMounted} from "vue"
import {mdiChevronRight} from "@mdi/js";
import CarouselComponent from "~/components/CarouselComponent.vue";
import SlideGroupComponent from "~/components/SlideGroupComponent.vue";
import PublicationCardComponent from "~/components/PublicationCardComponent.vue";
import ClientSlider from "~/components/ClientSlider.vue";
import {useElementSize, useScreenOrientation} from "@vueuse/core";
import {useDisplay} from "vuetify";
import SvgIcon from "@jamescoyle/vue-icon";
import {useCarouselStore} from "~/store/carousel";
import {useServicesStore} from "~/store/services";
import {usePublicationsStore} from "~/store/publications";
import {useClientsStore} from "~/store/clients";
import {useRoute} from "vue-router";
import {useCommonStore} from "~/store/common";
import {useI18n} from "vue-i18n";
import {useLangStore} from "~/store/lang";

definePageMeta({
  breadcrumb: 'pages.main.title'
})
const props = defineProps({
  appBarHeight: {
    type: Number,
    default: 0
  }
})
const {orientation} = useScreenOrientation()
const scrollContainer = ref(null)
const langStore = useLangStore()
const { tm, locale } = useI18n()
const {$display} = useNuxtApp()
const { mobile, width, xxl } = useDisplay()
const showMore = ref(false)
const isIndex = computed(() => {
  return useRoute().name === 'index'
})
const slideComponent = ref(null)
const {height} = useElementSize(slideComponent)
const display = useDisplay()
const {find} = useStrapi()
const slideGroupHeight = ref(0)

const mainPageCarousel = useCarouselStore()
const services = useServicesStore()
const publications = usePublicationsStore()
const clients = useClientsStore()
const commonStore = useCommonStore()

const current = computed(() => {
  return showMore.value ? clients.list.length : (useDisplay().xlAndUp ? 8 : 2)
})

commonStore.setComponent(null)
commonStore.setTitle(null)
commonStore.setServiceFilter(null)

watch(height, (value) => {
  if (value > 0) {
    slideGroupHeight.value = display.height.value - value - props.appBarHeight + 20
  }
})

onMounted(async () => {
  await nextTick()
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft =
        (scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth) / 2;
  }
})
</script>

<style lang="scss" scoped>
.about {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-column-gap: 5%;
}

.service {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 45%);
  grid-column-gap: 5%;

  & .overlay {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .8);
  }
}

.publications {
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-column-gap: 5%;
  grid-auto-rows: minmax(370px, 370px);
  @media(min-width: 1920px) {
    grid-template-columns: repeat(4, 22%);
    grid-column-gap: 4%;
  }
}

.clients {
  display: grid;
  grid-template-columns: repeat(4, 20%);
  grid-gap: 80px;
  grid-auto-rows: max-content;
  margin-top: 70px;
  margin-bottom: 60px;
  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 40%);
    grid-gap: calc((100% - (2 * 40%)) / 2);
  }
  & a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.mobile_slider {
  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
}
.infinity-slider-container {
  overflow: hidden;

  .slider {
    display: flex;
  }

  .slider-item {
    flex: 0 0 auto;
    padding: 10px;
    border: 1px solid #ccc;
    margin-right: 10px;
  }
}
</style>
