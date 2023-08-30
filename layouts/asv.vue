<template>
  <v-layout class="asv rounded rounded-md">
      <v-navigation-drawer style="z-index: 9" :class="`d-flex align-center ${rail ? 'justify-start' : 'justify-center'}`"
                           :rail="rail"
                           v-model="drawer"
                           :permanent="true"
                           :rail-width="display.width.value"
                           @click="rail = false"
                           :width="$display.socialBar(display.width.value, 150)" color="secondary">
        <div ref="networksContainer" :class="`network__container ${rail ? 'open' : ''}`">
          <div ref="sloganContainer" class="network__container-slogan">
            <h1 ref="slogan" class="text-uppercase text-accent font-size-18">{{ $t('titles.networks') }}</h1>
          </div>
          <div class="network__container-line"></div>
          <div class="d-flex align-center justify-center flex-column">
            <template v-for="(social, index) of socialNetworks" :key="index">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-btn v-bind="props" icon variant="plain" :ripple="false" style="opacity: 1" :href="social.href">
                    <svg-icon type="mdi" :class="isHovering ? 'text-info' : 'text-white'" :path="social.icon"></svg-icon>
                  </v-btn>
                </template>
              </v-hover>
            </template>
          </div>
        </div>
        <template v-if="rail">
          <div class="d-flex justify-center align-center flex-column position-relative"
               style="width: calc(100% - 300px)">
            <v-btn color="#fff" class="position-absolute" icon variant="plain"
                   :ripple="false" style="top: -25%; right: -10%">
              <svg-icon type="mdi" :path="mdiClose" size="48" />
            </v-btn>
            <template v-for="item of menu">
              <NuxtLink :to="item.route"
                        transition="fade"
                        class="text-h3 my-6 d-flex align-center text-uppercase text-decoration-none font-weight-bold text-white on-hover">
                {{ item.title }}
              </NuxtLink>
            </template>
          </div>
        </template>
      </v-navigation-drawer>
      <v-app-bar :fixed="true" elevation="0" :height="$display.navBar(display.height.value, 157)">
        <div class="appbar">
          <NuxtLink to="/">
            <v-img :width="$display.logo(display.width.value, 200)" src="/logo.svg"></v-img>
          </NuxtLink>
          <v-btn style="opacity: 1; text-transform: initial; font-size: 18px" variant="plain"
                 :ripple="false"
                 class="d-flex align-center">
            <span class="mr-4">{{ $t('search') }}</span>
            <svg-icon size="26" type="mdi" :path="mdiMagnify"/>
          </v-btn>
          <div ref="phonesContainer" class="d-flex align-center phones__container">
            <div class="d-flex flex-column justify-center align-end">
              <span class="font-weight-bold text-uppercase font-size-13">{{ $t('salesDepartment') }}</span>
              <span class="font-weight-bold text-uppercase font-size-13">{{ $t('serviceDepartment') }}</span>
            </div>
            <div ref="phoneSeparator" class="separator"></div>
            <div class="d-flex flex-column justify-center align-start">
              <a href="tel:+37068655420" class="phone_link font-weight-bold text-uppercase font-size-13">+370 686 55 420</a>
              <a href="tel:+375173362302" class="phone_link font-weight-bold text-uppercase font-size-13">+375 17 336 23 02</a>
            </div>
          </div>
          <div ref="phonesContainer" class="d-flex align-center langs__container">
            <div class="d-flex flex-column justify-center align-end flex-row-gap-4">
              <lt />
              <ru />
              <us />
            </div>
            <div ref="langSeparator" class="separator"></div>
            <div class="d-flex flex-column justify-center align-start flex-row-gap-4">
              <v-btn variant="plain" icon
                     @click="locale = 'lt'"
                     :ripple="false" style="opacity: 1"
                     :class="`lang_link font-weight-bold text-uppercase pa-0 ${locale === 'lt' ? 'active__lang' : ''}`">LT
              </v-btn>
              <v-btn variant="plain" icon
                     @click="locale = 'ru'"
                     :ripple="false" style="opacity: 1"
                     :class="`lang_link font-weight-bold text-uppercase pa-0 ${locale === 'ru' ? 'active__lang' : ''}`">RU
              </v-btn>
              <v-btn variant="plain" icon
                     @click="locale = 'en'"
                     :ripple="false" style="opacity: 1"
                     :class="`lang_link font-weight-bold text-uppercase pa-0 ${locale === 'en' ? 'active__lang' : ''}`">EN
              </v-btn>
            </div>
            <div class="d-flex flex-column justify-center align-center flex-row-gap-4 ml-12">
              <v-btn variant="plain" icon
                     @click="rail = true"
                     :ripple="false" style="opacity: 1" class="lang_link font-weight-bold text-uppercase pa-0">
                <svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M0 8.7757H20V12.1745H0V8.7757ZM0 0.278809H26.6667V3.67757H0V0.278809ZM0 20.6714H12.0583V17.2726H0V20.6714Z"
                      fill="#000"/>
                </svg>
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
                            class="d-flex align-center text-uppercase text-decoration-none text-white font-weight-bold on-hover">
                    {{ item.title }}
                  </NuxtLink>
                </template>
              </div>
            </v-fade-transition>
          </div>
        </template>
        <template v-else>
          <template v-if="commonStore.getComponent">
            <v-img class="position-absolute breadcrumbs-bar"
                   src="/breadcrumbs-bg.png"
                   ref="image"
                   :cover="true"
                   :min-height="120"
                   :width="$display.footer(display.width.value, $display.socialBar(display.width.value, 150))"
                   :style="`top: ${$display.navBar(display.height.value, 157)}px; margin-left: ${$display.socialBar(display.width.value, 150)}px; padding-bottom: ${commonStore.getComponent ? 60 : 0}px; padding-top: ${commonStore.getComponent ? 60 : 0}px`">
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
                   :style="`top: ${$display.navBar(display.height.value, 157)}px; margin-left: ${$display.socialBar(display.width.value, 150)}px; padding-bottom: ${commonStore.getComponent ? 60 : 0}px; padding-top: ${commonStore.getComponent ? 60 : 0}px`">
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
          <h4 class="font-size-36 font-weight-bold text-uppercase text-center">{{ $t('titles.menu') }}</h4>
          <h4 class="font-size-36 font-weight-bold text-uppercase text-center">{{ $t('titles.askQuestion') }}</h4>
        </div>
        <div class="footer-info">
          <div class="contacts-container">
            <div class="d-flex flex-column flex-row-gap-5">
              <span class="text-white text-uppercase" style="letter-spacing: .00005rem">
                {{ $t('salesDepartment') }}
              </span>
              <a class="on-hover text-white text-decoration-none font-weight-bold font-size-18" href="tel:+375173362300">+375
                17
                336 23 00</a>
            </div>
            <div class="d-flex flex-column flex-row-gap-5">
              <span class="text-white text-uppercase" style="letter-spacing: .00005rem">
                {{ $t('titles.service') }}
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
                {{ $t('titles.address') }}
              </span>
              <a class="on-hover text-white text-decoration-none font-weight-bold font-size-18" href="" v-html="$t('address')">
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
          <v-form @submit.prevent="onSubmit" class="feedback-container">
            <div class="d-flex justify-space-between flex-column-gap-22 w-100">
              <v-text-field :label="$t('form.name')" type="text" hide-details variant="outlined" density="compact"
                            :rules="[rules.required]"
                            v-model="feedback.name"
                            :rounded="0"
                            class="w-50"></v-text-field>
              <v-text-field :label="$t('form.company')" type="text" hide-details variant="outlined" density="compact"
                            :rules="[rules.required]"
                            v-model="feedback.company"
                            :rounded="0"
                            class="w-50"></v-text-field>
            </div>
            <div class="d-flex justify-space-between flex-column-gap-22 w-100">
              <v-text-field :label="$t('form.phoneNumber')" type="text" hide-details variant="outlined" density="compact"
                            :rules="[rules.required]"
                            v-model="feedback.phone"
                            :rounded="0"
                            class="w-50 border-opacity-100"></v-text-field>
              <v-text-field label="E-mail" type="email" hide-details variant="outlined" density="compact"
                            :rules="[rules.required, rules.email]"
                            v-model="feedback.email"
                            :rounded="0"
                            class="w-50"></v-text-field>
            </div>
            <div class="d-flex w-100">
              <v-textarea :rules="[rules.required]" v-model="feedback.feedback" label="Сообщение" :rounded="0" hide-details variant="outlined" class="w-100"></v-textarea>
            </div>
            <div class="d-flex justify-space-between flex-column-gap-22 w-100">
              <small class="text-secondary-light">
                <sup>*</sup> {{ message }}
              </small>
              <v-btn type="submit" variant="outlined" class="rounded-0">
                {{ $t('form.submit') }}
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-footer>
      <client-only>
        <v-footer class="d-flex flex-column bg-primary py-15 flex-row-gap-15"
                  :style="`padding-left: calc((255 * 100%) / 1920); padding-right: calc((255 * 100%) / 1920);min-height: 200px; width: ${$display.footer(display.width.value, $display.socialBar(display.width.value, 150))}px; margin-left: ${$display.socialBar(display.width.value, 150)}px`">
          <v-divider class="w-100" style="border-width: 0.12px; opacity: 1" color="info"/>
          <div class="d-flex justify-space-between flex-column-gap-60">
            <small class="text-secondary-light">
              © {{ new Date().getFullYear() }} <span v-html="$t('copyright')"></span>
            </small>
            <div class="d-flex justify-space-between align-start flex-column-gap-15">
              <small class="text-secondary-light text-right">
                {{
                  $t('development')
                }}
              </small>
              <v-img src="/fcb.svg" width="150"></v-img>
            </div>
          </div>
        </v-footer>
      </client-only>
  </v-layout>
</template>

<script setup>
import {computed, ref, watch, onMounted} from "vue";
import {useDisplay} from "vuetify";
import SvgIcon from '@jamescoyle/vue-icon'
import {useCommonStore} from "~/store/common";
import {useElementSize} from "@vueuse/core";
import {mdiClose, mdiMagnify} from "@mdi/js";
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
import {useI18n} from "vue-i18n";

const rail = ref(false)
const drawer = ref(true)
const {find, create} = useStrapi()
const route = useRoute()
const {$display, $dateTime} = useNuxtApp()
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
const socialNetworks = computed(() => {
  return commonStore.getNetworks
})

const isIndex = computed(() => {
  return route.name === 'index' || route.name === 'Index' || route.name === 'INDEX'
})
const { locale, tm } = useI18n()
const currentLocale = ref(locale.value)
let message = ref(tm('form.notice'))
let menu = ref(tm('menu'))

const mainPageCarousel = useCarouselStore()
const services = useServicesStore()
const publications = usePublicationsStore()
const clients = useClientsStore()
const isOpen = ref(false)
const feedback = ref({
  name: null,
  company: null,
  phone: null,
  email: null,
  feedback: null,
})
const rules = ref({
  required: value => !!value || 'Поле обязательно к заполнению',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Поле должно быть валидным e-mail.'
  },
})
const onSubmit = async () => {
  await create('feedbacks', feedback.value)
      .then(() => {
        for (let key in feedback.value) {
          if (Object.hasOwn(feedback.value, key)) {
            feedback.value[key] = null
          }
        }
        message.value = tm('form.success')
        setTimeout(() => {
          message.value = tm('form.notice')
        }, 5000)
      })
}
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
          populate: ['logo', 'whiteLogo']
        },
      },
  locale: locale.value
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
            item.id,
            item.attributes.title,
            item.attributes.subtitle,
            item.attributes.article,
            item.attributes.image.data.attributes.url,
            item.attributes.slug,
            $dateTime.formatDate(item.attributes.createdAt),
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

                    return new Service(
                        item.id,
                        item.attributes.logo.data.attributes.url,
                        item.attributes.name,
                        item.attributes.slug,
                        item.attributes.description,
                        item.attributes.whiteLogo.data.attributes.url,
                    ).toJson()
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
    phoneSeparator.value['style'].height = `${(value * 70) / 100}px`
    langSeparator.value['style'].height = `${(value * 70) / 100}px`
  }
}, {immediate: true})

watch(breadcrumbsContainerSize.height, (value) => {
  if (value > 0) {
    if (commonStore.getComponent) {
      marginTop.value = value + 120
    } else {
      marginTop.value = 150
    }
  }
}, {immediate: true})

watch(locale, async (value) => {
  if (value !== currentLocale.value) {
    menu = tm('menu')
    message = tm('form.notice')

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
              populate: ['logo', 'whiteLogo']
            },
          },
      locale: value
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
                item.id,
                item.attributes.title,
                item.attributes.subtitle,
                item.attributes.article,
                item.attributes.image.data.attributes.url,
                item.attributes.slug,
                $dateTime.formatDate(item.attributes.createdAt),
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

                        return new Service(
                            item.id,
                            item.attributes.logo.data.attributes.url,
                            item.attributes.name,
                            item.attributes.slug,
                            item.attributes.description,
                            item.attributes.whiteLogo.data.attributes.url,
                        ).toJson()
                      })
                    }
                  })
          )
        })
  }
}, {immediate: true})

onMounted(() => {
  commonStore.setLoading(false)
})

</script>

<style lang="scss" scoped>
:deep(a) {
  &:not(.text-white, .more_info__button) {
    font-weight: bold;
    text-decoration: none;
    color: inherit !important;
  }
}
.on-hover {
  transition: all .3s ease-in-out;

  &:hover {
    color: #00EAFC !important;
  }
}
</style>
