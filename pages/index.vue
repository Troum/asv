<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <v-col cols="12" class="ma-0 pa-0 position-relative">
        <client-only>
          <carousel-component ref="slideComponent" :slides="mainPageCarousel.list"/>
          <slide-group-component :height="slideGroupHeight" :slides="services.list"
                                 class="position-absolute"
                                 :is-index="isIndex"
                                 :style="`top: ${height - 20}px; left: 0; right: 0;`"/>
        </client-only>
      </v-col>
      <v-col cols="10" class="d-flex flex-column pa-0 mx-auto position-relative"
             :class="{'flex-row-gap-46': !mobile}"
             :style="`margin-top: ${slideGroupHeight + 40}px;`">
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
            <v-btn :height="50" :width="160" class="rounded-0 mx-auto bg-primary" variant="tonal" to="/about">
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
             :style="`margin-top: ${slideGroupHeight + 40}px; row-gap: 48px; height: auto`">
        <h2 class="text-uppercase text-center font-size-48" v-html="$t('mainPage.service.title')"></h2>
        <template v-if="mobile">
          <div class="d-flex flex-column pa-4 text-center flex-row-gap-40">
            <article>
              {{ $t('mainPage.service.articles.first') }}
            </article>
            <article>
              {{ $t('mainPage.service.articles.second') }}
            </article>
            <article v-html="$t('mainPage.service.articles.third.content', {address: 'info', domain: 'asvtrade.lt', link: 'mailto:info@asvtrade.lt'})">
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
              <article v-html="$t('mainPage.service.articles.third.content', {address: 'info', domain: 'asvtrade.lt', link: 'mailto:info@asvtrade.lt'})">
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
      <v-col cols="10" class="d-flex flex-column pa-0 mx-auto flex-row-gap-48 position-relative"
             :style="`margin-top: ${slideGroupHeight + 40}px;`">
        <div class="d-flex justify-space-between align-center">
          <h2 class="text-uppercase text-center font-size-48" v-html="$t('titles.news')"></h2>
          <v-btn style="opacity: 1;" variant="plain"
                 :ripple="false"
                 class="d-flex align-center font-size-18 font-weight-bold">
            <NuxtLink to="/publications" class="mr-4 text-decoration-none text-primary">{{ $t('buttons.all') }}</NuxtLink>
            <svg-icon size="26" type="mdi" :path="mdiChevronRight"/>
          </v-btn>
        </div>
        <client-only>
          <template v-if="mobile">
            <template v-if="publications.list.slice(0, current).length > 2">
              <div class="d-flex align-center flex-column-gap-35"
                   :style="`overflow-x: scroll; width: ${width * 2}px; margin-left:-${width / 2 + 35}px`">
                <template v-for="(publication, index) of publications.list.slice(0, current)"
                          :key="index" class="pa-0">
                  <publication-card-component :publication="publication"/>
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
              <template v-for="(publication, key) of publications.list.slice(0, current)" :key="key">
                <publication-card-component :publication="publication"/>
              </template>
            </div>
          </template>
        </client-only>
      </v-col>
      <v-col cols="10" class="d-flex flex-column pa-0 mx-auto flex-row-gap-48 position-relative"
             :style="`margin-top: ${!mobile ? slideGroupHeight + 40 : 40}px; margin-bottom: ${!mobile ? slideGroupHeight + 40 : 40}px;`">
        <h2 class="text-uppercase text-center font-size-48" v-html="$t('titles.clients')"></h2>
        <div class="clients">
          <template v-for="(client, key) of clients.list.slice(0, current)" :key="key">
            <client-card-component :client="client"/>
          </template>
        </div>
      </v-col>
      <v-col cols="10"
             :style="`margin-bottom: ${slideGroupHeight}px;`"
             class="d-flex flex-column pa-0 mx-auto flex-row-gap-48 position-relative">
        <v-btn @click="showMore = true" :height="50" :width="160" class="rounded-0 mx-auto bg-primary" variant="tonal">
          <span class="text-white font-weight-bold">{{ $t('buttons.allClients') }}</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref, watch} from "vue"
import {mdiChevronRight} from "@mdi/js";
import CarouselComponent from "~/components/CarouselComponent.vue";
import SlideGroupComponent from "~/components/SlideGroupComponent.vue";
import PublicationCardComponent from "~/components/PublicationCardComponent.vue";
import ClientCardComponent from "~/components/ClientCardComponent.vue";
import {useElementSize} from "@vueuse/core";
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
const langStore = useLangStore()
const { tm, locale } = useI18n()
const {$display} = useNuxtApp()
const { mobile, width } = useDisplay()
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
  return showMore.value ? clients.list.length : (useDisplay().xlAndUp ? 4 : 2)
})

commonStore.setComponent(null)
commonStore.setTitle(null)
commonStore.setServiceFilter(null)

watch(height, (value) => {
  if (value > 0) {
    slideGroupHeight.value = display.height.value - value - props.appBarHeight + 20
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
  grid-gap: calc((100% - (4 * 20%)) / 3);
  grid-auto-rows: minmax(100px, 100px);
  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 40%);
    grid-gap: calc((100% - (2 * 40%)) / 2);
  }
}
</style>
