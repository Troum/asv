<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="mx-0 position-relative page-frames"
           :style="`margin-top: ${frameMargin}px`">
      <v-card flat style="padding-top: 60px; padding-bottom: 60px">
        <v-card-title tag="h1" class="text-uppercase font-size-36 px-0 text-pre-wrap">ведущий литовский дистрибьютор
          профессионального медицинского оборудования
        </v-card-title>
        <v-card-subtitle tag="h4" class="text-uppercase font-size-18 px-0 text-pre-wrap mt-5" style="color: #333">Закрытое акционерное общество „АСВ Трейд“ было учереждено 08 апреля 2013 года. Основной деятельностью
          предприятия является оптовая торговля
          оборудованием медицинского назначения, а также расходными материалами.
        </v-card-subtitle>
        <v-card-text class="px-0">
          <nuxt-img style="max-width: 100%" class="my-5" src="/poster.png"></nuxt-img>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<script setup>
defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})
definePageMeta({
  breadcrumb: 'О компании'
})

const {$event} = useNuxtApp()

$event('set:component', {
  content: 'СООО «АСВ Трейд Сервис» – ведущий белорусский дистрибьютор профессионального медицинского оборудования. Наша компания занимается поставкой оборудования под известными марками, производители которого являются лидерами в своей области. Вся продукция соответствует самым высоким требованиям и произведена в таких странах, как Япония, США, Франция, Германия, Израиль, Испания и др.',
  logo: '/logo-w.svg'
})
</script>

<style lang="scss" scoped>

</style>
