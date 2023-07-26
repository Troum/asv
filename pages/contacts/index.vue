<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="mx-0 position-relative page-frames pr-0 pt-0 pb-0" :style="`margin-top: ${frameMargin}px`">
      <div class="contact-page">
        <div class="py-16">
          <v-card flat>
            <v-card-title>
              СООО “АСВ Трейд Сервис”
            </v-card-title>
            <v-card-text class="pa-0 d-flex flex-column flex-row-gap-32">
              <v-card-subtitle style="opacity: 1" class="d-flex flex-column">
                <span>УНП: 690658079О</span>
                <span>КПО: 302620456000</span>
                <span>р/с: BY55BLBB30120690658079001001</span>
                <span style="white-space: pre-wrap">В банк: ОАО «Белинвестбанк» ГОПЕРУ код BLBBBY2X, г. Минск, пр-т Машерова, 29</span>
              </v-card-subtitle>
              <v-card-subtitle style="opacity: 1" class="d-flex flex-column-gap-25">
                <phone/>
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">отдел продаж</span>
                  <a class="on-hover text-primary text-decoration-none font-weight-medium font-size-20"
                     href="tel:+375173362300">+375 17 336 23 00</a>
                </div>
              </v-card-subtitle>
              <v-card-subtitle style="opacity: 1" class="d-flex flex-column-gap-25">
                <phone/>
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">сервис</span>
                  <a class="on-hover text-primary text-decoration-none font-weight-medium font-size-20"
                     href="tel:+375291661880">+375 29 166 18 80</a>
                </div>
              </v-card-subtitle>
              <v-card-subtitle style="opacity: 1" class="d-flex flex-column-gap-25">
                <envelop />
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">e-mail</span>
                  <a class="on-hover text-primary text-decoration-none font-weight-medium font-size-20"
                     href="mailto:inbox@asv-trade.by">inbox@asv-trade.by</a>
                  <a class="on-hover text-primary text-decoration-none font-weight-medium font-size-20"
                     href="mailto:service@asv-trade.by">service@asv-trade.by</a>
                </div>
              </v-card-subtitle>
              <v-card-subtitle style="opacity: 1" class="d-flex flex-column-gap-25">
                <v-img src="/marker.svg" width="24"></v-img>
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">наш адрес</span>
                  <a class="on-hover text-primary text-decoration-none font-weight-medium font-size-20"
                     style="white-space: pre-wrap"
                     href="#">220089, г.Минск, ул. Железнодорожная 33А, корп.1 (5 этаж)
                  </a>
                </div>
              </v-card-subtitle>
            </v-card-text>
          </v-card>
        </div>
        <div ref="map" style="filter: grayscale(100%)">
          <map-component :width="width" :height="height"/>
        </div>
      </div>
    </v-col>
  </v-container>
</template>

<script setup>
import {ref} from "vue"
import MapComponent from "~/components/MapComponent.vue";
import Phone from "~/components/icons/phone.vue";
import Envelop from "~/components/icons/envelop.vue";
import {useElementSize} from "@vueuse/core";

defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})
definePageMeta({
  breadcrumb: 'Контакты'
})
const map = ref(null)
const { width, height } = useElementSize(map)
const {$event} = useNuxtApp()
$event('set:component', {
  content: 'СООО «АСВ Трейд Сервис» – ведущий белорусский дистрибьютор профессионального медицинского оборудования. Наша компания занимается поставкой оборудования под известными марками, производители которого являются лидерами в своей области. Вся продукция соответствует самым высоким требованиям и произведена в таких странах, как Япония, США, Франция, Германия, Израиль, Испания и др.',
  logo: '/logo-w.svg'
})
</script>

<style lang="scss" scoped>
.contact-page {
  display: grid;
  grid-template-columns: calc((100% - 55%) - 40px) calc((100% - 45%) - 40px);
  grid-column-gap: 80px;
}
</style>
