<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="mx-0 position-relative"
           :class="{'page-frames': !mobile, 'px-6': mobile}"
           :style="`margin-top: ${frameMargin}px`">
      <template v-if="timeout">
        {{ $t('loading') }}
      </template>
      <template v-else>
        <v-card flat style="padding-top: 60px; padding-bottom: 60px">
          <v-card-title tag="h1" class="text-uppercase font-size-36 px-0 text-pre-wrap" style="line-height: 40px">
            {{ page.title }}
          </v-card-title>
          <v-card-subtitle tag="h4" class="text-uppercase font-size-18 px-0 text-pre-wrap mt-5"
                           style="color: #333; line-height: 22px">
            {{ page.subtitle }}
          </v-card-subtitle>
          <v-card-text class="px-0">
            <nuxt-img provider="strapi" style="width: 100%" class="my-5" :src="page.image"></nuxt-img>
            <article v-html="content"></article>
          </v-card-text>
          <template v-if="false">
            <v-card-subtitle tag="h4"
                             class="text-uppercase font-size-18 font-weight-bold px-0 text-pre-wrap mt-5"
                             style="color: #000;opacity: 1">
              сертификаты компании
            </v-card-subtitle>
            <v-card-subtitle tag="h4"
                             class="text-uppercase font-size-18 font-weight-regular px-0 text-pre-wrap mt-5"
                             style="color: #000; opacity: 1">
              качество продукции, сервиса и услуг нашей компании подтверждается сертификатами
            </v-card-subtitle>
            <v-card-text>
              <vueper-slides
                  class="no-shadow"
                  fixed-height="400px"
                  :visible-slides="3"
                  :slide-ratio="1 / 4"
                  :arrows-outside="true"
                  :dragging-distance="70">
                <template #arrow-left>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="27" viewBox="0 0 13 27" fill="none">
                    <path d="M11 2L1 13.5L11 25" stroke="black" stroke-width="2" stroke-linecap="square"
                          stroke-linejoin="round"/>
                  </svg>
                </template>
                <vueper-slide v-for="(certificate, index) of certificates" :key="index">
                  <template #content>
                    <certificate-card-component :certificate="certificate"/>
                  </template>
                </vueper-slide>
                <template #arrow-right>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="27" viewBox="0 0 13 27" fill="none">
                    <path d="M2 25L12 13.5L2 2" stroke="black" stroke-width="2" stroke-linecap="square"
                          stroke-linejoin="round"/>
                  </svg>
                </template>
              </vueper-slides>
            </v-card-text>
          </template>
          <template v-if="timeout">
            {{ $t('loading') }}
          </template>
          <template v-else>
            <v-card-text>
              <template v-if="doctors.length > 3">
                <vueper-slides
                    class="no-shadow"
                    fixed-height="750px"
                    :visible-slides=" mobile ? 1 : 3"
                    :slide-ratio="1 / 4"
                    :arrows-outside="!mobile"
                    :bullets="doctors.length > 3"
                    :gap="8"
                    :dragging-distance="70">
                  <template #arrow-left>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="27" viewBox="0 0 13 27" fill="none">
                      <path d="M11 2L1 13.5L11 25" stroke="black" stroke-width="2" stroke-linecap="square"
                            stroke-linejoin="round"/>
                    </svg>
                  </template>
                  <vueper-slide v-for="(doctor, index) of doctors" :key="index">
                    <template #content>
                      <doctor-card-component :doctor="doctor"/>
                    </template>
                  </vueper-slide>
                  <template #arrow-right>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="27" viewBox="0 0 13 27" fill="none">
                      <path d="M2 25L12 13.5L2 2" stroke="black" stroke-width="2" stroke-linecap="square"
                            stroke-linejoin="round"/>
                    </svg>
                  </template>
                </vueper-slides>
              </template>
              <template v-else>
                <div class="d-flex align-baseline justify-start flex-column-gap-35">
                  <template v-for="(doctor, index) of doctors" :key="index">
                    <div :style="`flex: 0 0 auto; width: calc(100% / ${lg ? 3 : 4})`">
                      <doctor-card-component :doctor="doctor"/>
                    </div>
                  </template>
                </div>
              </template>
            </v-card-text>
          </template>

        </v-card>
      </template>
    </v-col>
  </v-container>
</template>

<script setup>
import {VueperSlide, VueperSlides} from "vueperslides";
import 'vueperslides/dist/vueperslides.css'
import {useCommonStore} from "~/store/common";
import DoctorCardComponent from "~/components/DoctorCardComponent.vue";
import CertificateCardComponent from "~/components/CertificateCardComponent.vue";
import {onBeforeMount, ref, watch, computed} from "vue"
import Doctor from "~/models/Doctor";
import {useI18n} from "vue-i18n";
import {useLangStore} from "~/store/lang";
import {useDisplay} from "vuetify";

definePageMeta({
  breadcrumb: 'pages.about.title'
})
defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})
const {locale, t} = useI18n()
const {mobile, lg, xl} = useDisplay()
definePageMeta({
  breadcrumb: 'pages.about.title'
})
const langStore = useLangStore()
const page = ref({})
const doctors = ref([])
const certificates = ref([])
const timeout = ref(true)
const {find} = useStrapi()
const commonStore = useCommonStore()

onBeforeMount(async () => {
  await find('about', {
    populate: {
      image: {
        fields: ['url']
      },
      doctors: {populate: 'avatar'},
      certificates: {populate: 'image'},
    },
    locale: langStore.getLang ?? locale.value
  })
      .then((response) => {
        doctors.value = []
        page.value = {
          title: response.data.attributes.title,
          subtitle: response.data.attributes.subtitle,
          description: response.data.attributes.description,
          image: response.data.attributes.image.data.attributes.url,
        }

        response.data.attributes.doctors.data.forEach((item) => {
          doctors.value.push(
              new Doctor(
                  item.attributes.name,
                  item.attributes.position,
                  item.attributes.description,
                  item.attributes.avatar.data.attributes.url
              )
          )
        })
        response.data.attributes.certificates.data.forEach((item) => {
          certificates.value.push(
              {image: item.attributes.image.data.attributes.url}
          )
        })

      })
      .then(() => timeout.value = false)
})
commonStore.setComponent({
  content: t('contacts.description'),
  logo: '/logo-w.svg'
})
commonStore.setTitle(null)
const content = computed(() => {
  const parser = new DOMParser()
  const html = parser.parseFromString(page.value.description, 'text/html')
  html.querySelectorAll('p').forEach(item => {
    if (item.innerText === '') {
      item.style.display = 'block'
      item.style.height = '1rem'
      item.style.marginBottom = '0px!important'
    }
  })
  return html.body.innerHTML
})
watch(locale, async (value) => {
  timeout.value = true
  await find('about', {
    populate: {
      image: {
        fields: ['url']
      },
      doctors: {populate: 'avatar'},
      certificates: {populate: 'image'},
    },
    locale: value
  })
      .then((response) => {
        doctors.value = []

        page.value = {
          title: response.data.attributes.title,
          subtitle: response.data.attributes.subtitle,
          description: response.data.attributes.description,
          image: response.data.attributes.image.data.attributes.url,
        }

        response.data.attributes.doctors.data.forEach((item) => {
          doctors.value.push(
              new Doctor(
                  item.attributes.name,
                  item.attributes.position,
                  item.attributes.description,
                  item.attributes.avatar.data.attributes.url
              )
          )
        })
        response.data.attributes.certificates.data.forEach((item) => {
          certificates.value.push(
              {image: item.attributes.image.data.attributes.url}
          )
        })
        commonStore.setComponent({
          content: t('contacts.description'),
          logo: '/logo-w.svg'
        })
      })
      .then(() => timeout.value = false)
}, {immediate: true})

</script>

<style lang="scss" scoped>

</style>
