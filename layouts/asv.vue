<template>
  <v-layout class="asv rounded rounded-md">
    <v-navigation-drawer class="d-flex align-center justify-center"
                         :width="$display.socialBar(display.width.value, 150)" color="secondary">
      <div ref="networksContainer" class="network__container">
        <div ref="sloganContainer" class="network__container-slogan">
          <h1 ref="slogan" class="text-uppercase text-accent font-size-18">мы в социальных сетях</h1>
        </div>
        <div class="network__container-line"></div>
        <div class="d-flex align-center justify-center flex-column">
          <template v-for="(social, index) of socialNetworks" :key="index">
            <v-btn icon variant="plain" :ripple="false" style="opacity: 1" :href="social.href">
              <svg-icon type="mdi" :path="social.icon"></svg-icon>
            </v-btn>
          </template>
        </div>
      </div>
    </v-navigation-drawer>
    <v-app-bar :fixed="true" elevation="0" :height="$display.navBar(display.height.value, 157)">
      <div class="appbar">
        <NuxtLink to="/">
          <v-img :width="$display.logo(display.width.value, 200)" src="/logo.svg"></v-img>
        </NuxtLink>
        <v-btn style="opacity: 1; text-transform: initial; font-size: 18px" variant="plain"
               :ripple="false"
               class="d-flex align-center">
          <span class="mr-4">Поиск по сайту</span>
          <svg-icon size="26" type="mdi" :path="mdiMagnify"/>
        </v-btn>
        <div ref="phonesContainer" class="d-flex align-center phones__container">
          <div class="d-flex flex-column justify-center align-end">
            <span class="font-weight-bold text-uppercase">Отдел продаж</span>
            <span class="font-weight-bold text-uppercase">Сервис</span>
          </div>
          <div ref="phoneSeparator" class="separator"></div>
          <div class="d-flex flex-column justify-center align-start">
            <a href="tel:+37068655420" class="phone_link font-weight-bold text-uppercase">+370 686 55 420</a>
            <a href="tel:+375173362302" class="phone_link font-weight-bold text-uppercase">+375 17 336 23 02</a>
          </div>
        </div>
        <div ref="phonesContainer" class="d-flex align-center langs__container">
          <div class="d-flex flex-column justify-center align-end" style="row-gap: 6px">
            <lt/>
            <ru/>
            <us/>
          </div>
          <div ref="langSeparator" class="separator"></div>
          <div class="d-flex flex-column justify-center align-start" style="row-gap: 6px">
            <v-btn variant="plain" icon
                   :ripple="false" style="opacity: 1" class="lang_link font-weight-bold text-uppercase pa-0">lt
            </v-btn>
            <v-btn variant="plain" icon
                   :ripple="false" style="opacity: 1" class="lang_link font-weight-bold text-uppercase pa-0">ru
            </v-btn>
            <v-btn variant="plain" icon
                   :ripple="false" style="opacity: 1" class="lang_link font-weight-bold text-uppercase pa-0">en
            </v-btn>
          </div>
        </div>
      </div>
    </v-app-bar>
    <client-only>
      <template v-if="isIndex">
        <div class="z-index-5 position-absolute menu-bar"
             :style="`height: ${$display.height(display.height.value, 120)}px; top: ${$display.navBar(display.height.value, 157)}px; width: ${$display.footer(display.width.value, $display.socialBar(display.width.value, 150))}px; margin-left: ${$display.socialBar(display.width.value, 150)}px`">
          <v-btn @click="isOpen = !isOpen" class="d-flex align-center my-auto px-0" icon variant="text" :ripple="false"
                 style="opacity: 1; width: fit-content;">
            <svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M0 8.7757H20V12.1745H0V8.7757ZM0 0.278809H26.6667V3.67757H0V0.278809ZM0 20.6714H12.0583V17.2726H0V20.6714Z"
                  fill="white"/>
            </svg>
          </v-btn>
          <v-fade-transition>
            <div v-if="isOpen" class="d-flex justify-space-between align-center w-75 ml-10 mr-auto">
              <template v-for="item of menu">
                <NuxtLink :to="item.route"
                          transition="fade"
                          class="d-flex align-center text-uppercase text-decoration-none font-weight-bold text-white on-hover">
                  {{ item.title }}
                </NuxtLink>
              </template>
            </div>
          </v-fade-transition>
        </div>
      </template>
      <template v-else>
        <template v-if="componentSet">
          <v-img class="position-absolute breadcrumbs-bar"
                 src="/breadcrumbs-bg.png"
                 ref="image"
                 :cover="true"
                 :min-height="120"
                 :width="$display.footer(display.width.value, $display.socialBar(display.width.value, 150))"
                 :style="`top: ${$display.navBar(display.height.value, 157)}px; margin-left: ${$display.socialBar(display.width.value, 150)}px; padding-bottom: ${componentSet ? 60 : 0}px; padding-top: ${componentSet ? 60 : 0}px`">
            <breadcrumbs-component/>
          </v-img>
        </template>
        <template v-else>
          <v-img class="position-absolute breadcrumbs-bar"
                 src="/breadcrumbs-bg.png"
                 ref="image"
                 :cover="true"
                 :max-height="120"
                 :width="$display.footer(display.width.value, $display.socialBar(display.width.value, 150))"
                 :style="`top: ${$display.navBar(display.height.value, 157)}px; margin-left: ${$display.socialBar(display.width.value, 150)}px; padding-bottom: ${componentSet ? 60 : 0}px; padding-top: ${componentSet ? 60 : 0}px`">
            <breadcrumbs-component/>
          </v-img>
        </template>
      </template>
    </client-only>
    <v-main class="d-flex flex-column align-center justify-center">
      <NuxtPage :appBarHeight="$display.navBar(display.height.value, 157)"
                :frameMargin="marginTop"/>
    </v-main>
    <template v-if="!isIndex">
      <v-footer class="pa-0 mt-10"
                :style="`width: ${$display.footer(display.width.value, $display.socialBar(display.width.value, 150))}px; margin-left: ${$display.socialBar(display.width.value, 150)}px`">
        <client-only>
          <slide-group-component :isIndex="isIndex" :height="100"/>
        </client-only>
      </v-footer>
    </template>
    <v-footer class="d-flex flex-column bg-primary py-15 px-0"
              :style="`min-height: 700px; width: ${$display.footer(display.width.value, $display.socialBar(display.width.value, 150))}px; margin-left: ${$display.socialBar(display.width.value, 150)}px`">
      <div class="footer-bar">
        <v-img :max-width="$display.logo(display.width.value, 200)" src="/logo-w.svg"></v-img>
        <h4 class="font-size-36 font-weight-bold text-uppercase text-center">меню</h4>
        <h4 class="font-size-36 font-weight-bold text-uppercase text-center">задать вопрос</h4>
      </div>
      <div class="footer-info">
        <div class="contacts-container">
          <div class="d-flex flex-column flex-row-gap-5">
              <span class="text-white text-uppercase" style="letter-spacing: .00005rem">
                отдел продаж
              </span>
            <a class="on-hover text-white text-decoration-none font-weight-bold font-size-18" href="tel:+375173362300">+375
              17
              336 23 00</a>
          </div>
          <div class="d-flex flex-column flex-row-gap-5">
              <span class="text-white text-uppercase" style="letter-spacing: .00005rem">
                сервис
              </span>
            <a class="on-hover text-white text-decoration-none font-weight-bold font-size-18" href="tel:+375291661880">+375
              29
              166 18 80</a>
          </div>
          <div class="d-flex flex-column flex-row-gap-5">
              <span class="text-white text-uppercase" style="letter-spacing: .00005rem">
                e-mail
              </span>
            <a class="on-hover text-white text-decoration-none font-weight-bold font-size-18"
               href="mailto:inbox@asv-trade.by">inbox@asv-trade.by</a>
            <a class="on-hover text-white text-decoration-none font-weight-bold font-size-18"
               href="mailto:service@asv-trade.by">service@asv-trade.by</a>
          </div>
          <div class="d-flex flex-column flex-row-gap-5">
              <span class="text-white text-uppercase" style="letter-spacing: .00005rem">
                наш адрес
              </span>
            <a class="on-hover text-white text-decoration-none font-weight-bold font-size-18" href="">
              220089, г.Минск, ул. Железнодорожная 33А, корп.1 (5 этаж)
            </a>
          </div>
        </div>
        <div class="menu-container">
          <template v-for="item of menu">
            <NuxtLink :to="item.route"
                      class="d-flex align-center text-uppercase text-decoration-none font-weight-bold text-white on-hover">
              {{ item.title }}
            </NuxtLink>
          </template>
        </div>
        <div class="feedback-container">
          <div class="d-flex justify-space-between flex-column-gap-22 w-100">
            <v-text-field label="Имя" type-text hide-details variant="outlined" density="compact"
                          :rounded="0"
                          class="w-50"></v-text-field>
            <v-text-field label="Компания" type="text" hide-details variant="outlined" density="compact"
                          :rounded="0"
                          class="w-50"></v-text-field>
          </div>
          <div class="d-flex justify-space-between flex-column-gap-22 w-100">
            <v-text-field label="Телефон" type="text" hide-details variant="outlined" density="compact"
                          :rounded="0"
                          class="w-50"></v-text-field>
            <v-text-field label="E-mail" type="email" hide-details variant="outlined" density="compact"
                          :rounded="0"
                          class="w-50"></v-text-field>
          </div>
          <div class="d-flex w-100">
            <v-textarea label="Сообщение" :rounded="0" hide-details variant="outlined" class="w-100"></v-textarea>
          </div>
          <div class="d-flex justify-space-between flex-column-gap-22 w-100">
            <small class="text-secondary-light">
              <sup>*</sup> Ваши данные не будут переданы третьим лицам. Мы гарантируем конфиденциальность и защищаем
              персональные данные.
            </small>
            <v-btn variant="outlined" class="rounded-0">
              отправить
            </v-btn>
          </div>
        </div>
      </div>
    </v-footer>
    <client-only>
      <v-footer class="d-flex flex-column bg-primary py-15 flex-row-gap-15"
                :style="`padding-left: calc((255 * 100%) / 1920); padding-right: calc((255 * 100%) / 1920);min-height: 200px; width: ${$display.footer(display.width.value, $display.socialBar(display.width.value, 150))}px; margin-left: ${$display.socialBar(display.width.value, 150)}px`">
        <v-divider class="w-100" style="border-width: 0.12px; opacity: 1" color="info"/>
        <div class="d-flex justify-space-between flex-column-gap-60">
          <small class="text-secondary-light">
            © 2023 СООО «АСВ Трейд Сервис» Все права на эксклюзивные материалы сайта www.asv-trade.by (далее Сайт)
            регулируются в соответствии с Законом РБ «Об авторском праве и смежных правах». Нарушение авторских прав в
            отношении портала преследуется по закону. Любое копирование, перепечатка и распространение материалов Сайта
            без
            активной обратной ссылки запрещены.
          </small>
          <div class="d-flex justify-space-between align-start flex-column-gap-15">
            <small class="text-secondary-light text-right">
              Дизайн и
              разработка:
            </small>
            <v-img src="/fcb.svg" width="150"></v-img>
          </div>
        </div>
      </v-footer>
    </client-only>
  </v-layout>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import {useDisplay} from "vuetify";
import SvgIcon from '@jamescoyle/vue-icon'
import {useCommonStore} from "~/store/common";
import {useElementSize} from "@vueuse/core";
import {mdiMagnify} from "@mdi/js";
import {useRoute} from "vue-router";
import Lt from "~/components/icons/lt.vue";
import Ru from "~/components/icons/ru.vue"
import Us from "~/components/icons/us.vue"
import BreadcrumbsComponent from "~/components/BreadcrumbsComponent.vue";
import Service from "~/models/Service";
import Publication from "~/models/Publication";
import Client from "~/models/Client";
import {useServicesStore} from "~/store/services";
import {usePublicationsStore} from "~/store/publications";
import {useClientsStore} from "~/store/clients";
import {useCarouselStore} from "~/store/carousel";
import Slide from "~/models/Slide";
import _ from "lodash"

const {find} = useStrapi()
const route = useRoute()
const {$display, $listen} = useNuxtApp()
const display = useDisplay()
const commonStore = useCommonStore()
const slogan = ref(null)
const langSeparator = ref(null)
const phoneSeparator = ref(null)
const sloganContainer = ref(null)
const phonesContainer = ref(null)
const networksContainer = ref(null)
const image = ref(null)
const {width} = useElementSize(slogan)
const {height} = useElementSize(networksContainer)
const phonesContainerSize = useElementSize(phonesContainer)
const breadcrumbsContainerSize = useElementSize(image)
const marginTop = ref(0)
const componentSet = ref(false)
const socialNetworks = computed(() => {
  return commonStore.getNetworks
})

const isIndex = computed(() => {
  return route.name === 'index' || route.name === 'Index' || route.name === 'INDEX'
})
const menu = ref([
  {
    route: '/catalog',
    title: 'Каталог'
  },
  {
    route: '/about',
    title: 'о компании'
  },
  {
    route: '/service',
    title: 'сервис'
  },
  {
    route: '/publications',
    title: 'новости'
  },
  {
    route: '/contacts',
    title: 'контакты'
  }
])
const mainPageCarousel = useCarouselStore()
const services = useServicesStore()
const publications = usePublicationsStore()
const clients = useClientsStore()
const isOpen = ref(false)

$listen('set:component', (object) => {
  componentSet.value = !(_.isNull(object) || _.isEmpty(object));
})

await find('main-page', {
  populate:
      {
        carousels: {
          populate: 'src'
        },
        clients: {
          populate: 'logo'
        },
        publications: {
          populate: 'image'
        },
        services: {
          populate: 'logo'
        },
      }
})
    .then((response) => {
      mainPageCarousel.addItems(
          response.data.attributes.carousels.data.map((item) => {
            return new Slide(
                item.attributes.title,
                item.attributes.description,
                item.attributes.link,
                item.attributes.src.data.attributes.url,
                item.attributes.background
            ).toJson()
          })
      )
      publications.addItems(response.data.attributes.publications.data.map((item) => {
        return new Publication(
            item.attributes.title,
            item.attributes.article,
            item.attributes.image.data.attributes.url,
            item.attributes.slug,
            item.attributes.createdAt,
        ).toJson()
      }))
      clients.addItems(response.data.attributes.clients.data.map((item) => {
        return new Client(
            item.attributes.url,
            item.attributes.logo.data.attributes.url
        ).toJson()
      }))
      services.addItems(response.data.attributes.services.data.reduce((all,one,i) => {
            const ch = Math.floor(i/4);
            all[ch] = [].concat((all[ch]||[]),one);
            return all
          }, [])
              .map((item) => {
                return {
                  slides: item.map((item) => {
                    return new Service(item.attributes.logo.data.attributes.url).toJson()
                  })
                }
              })
      )
    })

watch(width, (value) => {
  if (value > 0) {
    networksContainer.value['style'].gridTemplateRows = `${value}px repeat(2, 1fr)`
    sloganContainer.value['style'].height = `${value}px`
  }
}, {immediate: true})

watch(height, (value) => {
  if (value > 0) {
    networksContainer.value['style'].marginTop = `calc((100vh - ${value}px) / 1.25)`
  }
}, {immediate: true})

watch(phonesContainerSize.height, (value) => {
  if (value > 0) {
    phoneSeparator.value['style'].height = `${(value * 65) / 100}px`
    langSeparator.value['style'].height = `${(value * 65) / 100}px`
  }
}, {immediate: true})

watch(breadcrumbsContainerSize.height, (value) => {
  if (value > 0) {
    if (componentSet.value) {
      marginTop.value = value + 120
    } else {
      marginTop.value = value
    }

  }
}, {immediate: true})
</script>

<style lang="scss" scoped>
.on-hover {
  transition: all .3s ease-in-out;

  &:hover {
    color: #00EAFC !important;
  }
}
</style>
