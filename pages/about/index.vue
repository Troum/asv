<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="mx-0 position-relative page-frames"
           :style="`margin-top: ${frameMargin}px`">
      <v-card flat style="padding-top: 60px; padding-bottom: 60px">
        <v-card-title tag="h1" class="text-uppercase font-size-36 px-0 text-pre-wrap">
          {{ page.title }}
        </v-card-title>
        <v-card-subtitle tag="h4" class="text-uppercase font-size-18 px-0 text-pre-wrap mt-5" style="color: #333">
          {{ page.subtitle }}
        </v-card-subtitle>
        <v-card-text class="px-0">
          <nuxt-img provider="strapi" style="width: 100%" class="my-5" :src="page.image"></nuxt-img>
          <article v-html="page.description"></article>
        </v-card-text>
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
        <v-card-subtitle tag="h4"
                         class="text-uppercase font-size-18 font-weight-bold px-0 text-pre-wrap mt-5"
                         style="color: #000;opacity: 1">клинические тренеры нашей компании
        </v-card-subtitle>
        <v-card-subtitle tag="h4"
                         class="text-uppercase font-size-18 font-weight-regular px-0 text-pre-wrap mt-5"
                         style="color: #000; opacity: 1">компания “АСВ трейдинг” располагает большим количествам ведущих
          специалистов для обучения работе с нашим оборудованием
        </v-card-subtitle>
        <v-card-text>
          <vueper-slides
              class="no-shadow"
              fixed-height="750px"
              :visible-slides="3"
              :slide-ratio="1 / 4"
              :arrows-outside="true"
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
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<script setup>
import {VueperSlide, VueperSlides} from "vueperslides";
import 'vueperslides/dist/vueperslides.css'
import {useCommonStore} from "~/store/common";
import DoctorCardComponent from "~/components/DoctorCardComponent.vue";
import CertificateCardComponent from "~/components/CertificateCardComponent.vue";
import {ref} from "vue"
import Doctor from "~/models/Doctor";

defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})
definePageMeta({
  breadcrumb: 'О компании'
})
const page = ref({})
const doctors = ref([])
const certificates = ref([])
const {find} = useStrapi()
const commonStore = useCommonStore()
await find('about', {
  populate: {
    image: {
      fields: ['url']
    },
    doctors: {populate: 'avatar'},
    certificates: {populate: 'image'},
  }
})
    .then((response) => {
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
commonStore.setComponent({
  content: 'СООО «АСВ Трейд Сервис» – ведущий белорусский дистрибьютор профессионального медицинского оборудования. Наша компания занимается поставкой оборудования под известными марками, производители которого являются лидерами в своей области. Вся продукция соответствует самым высоким требованиям и произведена в таких странах, как Япония, США, Франция, Германия, Израиль, Испания и др.',
  logo: '/logo-w.svg'
})
commonStore.setTitle(null)
</script>

<style lang="scss" scoped>

</style>
