<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="ma-0 pa-0 position-relative">
      <carousel-component ref="slideComponent" :slides="slides" style="z-index: 4"/>
      <slide-group-component :height="slideGroupHeight" :slides="group"
                             class="position-absolute"
                             :style="`z-index: 5; top: ${height - 20}px; left: 0; right: 0;`"/>
    </v-col>
    <v-col cols="10" class="d-flex flex-column pa-0 mx-auto flex-row-gap-48 position-relative"
           :style="`margin-top: ${slideGroupHeight + 40}px;`">
      <h2 class="text-uppercase text-center font-size-48"><span class="text-info">о</span> компании</h2>
      <div
          :style="`background: url('/assets/images/doctor.jpeg') top center no-repeat; background-size: cover; width: 100%; min-height: ${$display.height(display.height.value, 500)}px`">
        <div class="d-flex flex-column justify-center align-start w-50 pa-10 text-white"
             :style="`background-color: rgba(0, 0, 0, .8); height: ${$display.height(display.height.value, 500)}px; row-gap: ${$display.height(display.height.value, 40)}px`">
          <h3 class="text-uppercase font-weight-bold font-size-21">
            ТЕХНОЛОГИИ БУДУЩЕГО УЖЕ СЕГОДНЯ!
          </h3>
          <article>
            СООО «АСВ Трейд Сервис» – ведущий белорусский дистрибьютор профессионального медицинского оборудования. Наша
            компания занимается поставкой оборудования под известными марками, производители которого являются лидерами
            в своей области. Вся продукция соответствует самым высоким требованиям и произведена в таких странах, как
            Япония, США, Франция, Германия, Израиль, Испания и др.
          </article>
        </div>
      </div>
      <div class="about font-size-16">
        <article class="text-center">
          <span class="text-info">СООО «АСВ Трейд Сервис»</span> прекрасно понимает, насколько важна роль оснащения
          медучреждений, а потому мы поставляем исключительно высококачественное медицинское оборудование. Все вопросы,
          касающиеся цен и комплектации оборудования, можно уточнить по телефону у наших сотрудников.
        </article>
        <article class="text-center">
          Специалисты <span class="text-info">СООО «АСВ Трейд Сервис»</span> регулярно проходят стажировки за рубежом и
          смогут квалифицированно помочь вам в выборе необходимого оборудования и расходных материалов.
        </article>
        <article class="text-center">
          <span class="text-info">СООО «АСВ Трейд Сервис»</span> производит ввод в эксплуатацию, гарантийный и
          постгарантийный ремонт оборудования. Кроме того, компания может предложить комплексное годовое обслуживание
          Вашего оборудования на самых выгодных условиях.
        </article>
      </div>
    </v-col>
    <v-col cols="10" class="d-flex flex-column pa-0 mx-auto position-relative"
           :style="`margin-top: ${slideGroupHeight + 40}px; row-gap: 48px;`">
      <h2 class="text-uppercase text-center font-size-48"><span class="text-info">сервис</span> медицинского
        оборудования</h2>
      <div class="service">
        <div class="d-flex flex-column pa-16 text-center flex-row-gap-40">
          <article>
            Мы проводим полную диагностику оборудования на предмет наличия неисправностей, включающую в себя
            тестирование отдельных блоков оборудования с указанием выявленных неисправностей.
          </article>
          <article>
            Ремонт техники, в том числе гарантийный, осуществляется в кратчайшие сроки и на высоком технологическом
            уровне. Сервисное сопровождение включает в себя консультацию, диагностику и ремонт оборудования. Оставить
            заявку Вы можете по адресу: <a class="text-info" style="text-decoration: none"
                                           href="mailto:service@asv-trade.by">service@asv-trade.by</a>
          </article>
          <article>
            Наш сервисный центр предоставляет услуги по гарантийному и послегарантийному обслуживанию и ремонту
            оборудования. Наличие первоклассного оборудования, материально-технической базы комплектующих и большого
            опыта в области ремонта позволяют производить работы на высоком уровне в сжатые сроки. На все виды работ
            предоставляется гарантия.
          </article>
        </div>
        <div class="position-relative"
             style="background: url('/assets/images/banner.jpg') top center no-repeat; background-size: cover; width: 100%">
          <div class="d-flex flex-column justify-center align-start text-white pa-16 z-index-2 position-relative"
               :style="`row-gap: ${$display.height(display.height.value, 40)}px`">
            <h3 class="text-uppercase font-weight-bold font-size-21 letter-spacing-21">
              широкий спектр услуг по сервисному сопровождению медицинского оборудования.
            </h3>
            <ul>
              <li>Ввод в эксплуатацию, гарантийный и постгарантийный ремонт оборудования</li>
              <li>Комплексное годовое обслуживание вашего оборудования на самых выгодных условиях</li>
              <li>Квалифицированные и опытные специалисты службы, прошедшие обучение на предприятиях ведущих фирм –
                производителей медицинской техники и сертифицированные на проведение ремонтных работ
              </li>
              <li>Развитая система складских запасов и оперативная служба доставки – в большинстве случаев клиентам не
                приходится ждать поставки запасных частей из-за рубежа
              </li>
              <li>Доверие клиентов, отличные рекомендации</li>
            </ul>
          </div>
          <div class="overlay z-index-1"></div>
        </div>
      </div>
    </v-col>
    <v-col cols="10" class="d-flex flex-column pa-0 mx-auto flex-row-gap-48 position-relative"
           :style="`margin-top: ${slideGroupHeight + 40}px;`">
      <div class="d-flex justify-space-between align-center">
        <h2 class="text-uppercase text-center font-size-48"><span class="text-info">новости</span> компании</h2>
        <v-btn style="opacity: 1;" variant="plain"
               :ripple="false"
               class="d-flex align-center font-size-18 font-weight-bold">
          <NuxtLink to="/publications" class="mr-4 text-decoration-none text-primary">Показать все</NuxtLink>
          <svg-icon size="26" type="mdi" :path="mdiChevronRight"/>
        </v-btn>
      </div>
      <div class="publications">
        <template v-for="(publication, key) of publications" :key="key">
          <publication-card-component :publication="publication"/>
        </template>
      </div>
    </v-col>
    <v-col cols="10" class="d-flex flex-column pa-0 mx-auto flex-row-gap-48 position-relative"
           :style="`margin-top: ${slideGroupHeight + 40}px; margin-bottom: ${slideGroupHeight + 40}px;`">
      <h2 class="text-uppercase text-center font-size-48"><span class="text-info">Клиенты</span> компании</h2>
      <div class="clients">
        <template v-for="client of 8" :key="client">
          <client-card-component/>
        </template>
      </div>
      <v-btn :height="50" :width="160" class="rounded-0 mx-auto bg-primary" variant="tonal">
        <span class="text-white font-weight-bold">все клиенты</span>
      </v-btn>
    </v-col>
  </v-container>
</template>

<script setup>
import {ref, watch} from "vue"
import {mdiChevronRight} from "@mdi/js";
import CarouselComponent from "~/components/CarouselComponent.vue";
import SlideGroupComponent from "~/components/SlideGroupComponent.vue";
import PublicationCardComponent from "~/components/PublicationCardComponent.vue";
import ClientCardComponent from "~/components/ClientCardComponent.vue";
import Slide from "~/models/Slide";
import {useElementSize} from "@vueuse/core";
import {useDisplay} from "vuetify";
import Service from "~/models/Service";
import SvgIcon from "@jamescoyle/vue-icon";
import Publication from "~/models/Publication";

const props = defineProps({
  appBarHeight: {
    type: Number,
    default: 0
  }
})
const {$display} = useNuxtApp()
const slideComponent = ref(null)
const {height} = useElementSize(slideComponent)
const display = useDisplay()
const {find} = useStrapi()
const slideGroupHeight = ref(0)
const slides = ref([])
const group = ref([])
const publications = ref([])

await find('main-page-carousels', {populate: 'src'})
    .then((response) => {
      slides.value = response.data.map((item) => {
        return new Slide(
            item.attributes.title,
            item.attributes.description,
            item.attributes.link,
            item.attributes.src.data.attributes.url,
            item.attributes.background
        )
      })
    })
    .then(async () => {
      await find('slides', {populate: 'logo'})
          .then((response) => {
            group.value = response.data.reduce((all,one,i) => {
              const ch = Math.floor(i/4);
              all[ch] = [].concat((all[ch]||[]),one);
              return all
            }, [])
                .map((item) => {
                  return {
                    slides: item.map((item) => {
                      return new Service(item.attributes.logo.data.attributes.url)
                    })
                  }
                })
          })
    })
    .then(async () => {
      await find('publications', {populate: 'image'})
          .then((response) => {
            publications.value = response.data.map((item) => {
              return new Publication(
                  item.attributes.title,
                  item.attributes.article,
                  item.attributes.image.data.attributes.url,
                  item.attributes.slug,
                  item.attributes.createdAt,
              )
            })
          })
    })
console.log(publications.value)

watch(height, (value) => {
  if (value > 0) {
    slideGroupHeight.value = display.height.value - value - props.appBarHeight + 20
  }
})

definePageMeta({
  breadcrumb: 'Главная'
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
    background: rgba(0, 0, 0, .85);
  }
}

.publications {
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-column-gap: 5%;
  grid-auto-rows: minmax(370px, 370px);
}

.clients {
  display: grid;
  grid-template-columns: repeat(4, 20%);
  grid-gap: calc((100% - (4 * 20%)) / 3);
  grid-auto-rows: minmax(100px, 100px);
}
</style>
