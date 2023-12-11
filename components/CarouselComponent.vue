<template>
  <v-carousel
      v-model="current"
      ref="carousel"
      class="position-relative z-index-4"
      :cycle="true"
      :height="mobile && orientation === 'landscape-primary' ? height : carouselHeight"
      hide-delimiters
      :show-arrows="slides.length > 1"
  >
    <template v-slot:prev="{ props }">
      <v-btn
          :ripple="false"
          style="opacity: 1"
          icon
          variant="plain"
          @click="props.onClick"
      >
        <chevron-left/>
      </v-btn>
    </template>
    <template v-slot:next="{ props }">
      <v-btn
          :ripple="false"
          style="opacity: 1"
          icon
          variant="plain"
          @click="props.onClick"
      >
        <chevron-right/>
      </v-btn>
    </template>
    <template v-if="slides.length > 1">
      <div ref="delimitersContainer"
           class="delimiters__container">
        <template v-for="(delimiter, index) of slides.length" :key="delimiter">
          <v-btn @click="current = index" icon variant="plain" style="opacity: 1" class="delimiter_button">
            <svg-icon :style="getColor(index)" size="18" :path="mdiCircle"
                      type="mdi"/>
          </v-btn>
        </template>
      </div>
    </template>
    <v-carousel-item
        cover
        v-for="(slide, i) in slides"
        :width="display.width.value"
        :height="mobile && orientation === 'landscape-primary' ? height : display.height.value - 95"
        :key="i"
        :src="`https://dashboard.asvtrade.lt${slide.src}`"
        content-class="px-4 px-lg-0 pt-lg-16"
    >
      <template v-if="mobile">
        <lazy-client-only>
          <div class="d-flex flex-column fill-height justify-center align-start"
               style="row-gap: 20px">
            <template v-if="slide.textColor">
              <article class="carousel_main_page" :style="$display.fontSize(display.height.value, 64) + `; color: ${slide.textColor ?? '#fff'}`" v-html="slide.title"></article>
              <article class="carousel_main_page carousel_description" :style="`color: ${slide.textColor ?? '#fff'}`" v-html="slide.description"></article>
            </template>
            <template v-else>
              <article class="carousel_main_page" :style="$display.fontSize(display.height.value, 64)" v-html="slide.title"></article>
              <article class="carousel_main_page carousel_description" v-html="slide.description"></article>
            </template>
            <template v-if="slide.link">
              <v-btn  rounded="0" :ripple="false" variant="tonal" :href="slide.link"
                      :style="`color: ${slide.buttonTextColor}; background-color: ${slide.buttonColor}`"
                      class="more_info__button">
                {{ $t('buttons.details') }}
              </v-btn>
            </template>
          </div>
        </lazy-client-only>
      </template>
      <template v-else>
        <v-sheet
            class="z-index-3 position-relative"
            color="transparent"
            :width="$display.slideContentWidth(display.width.value, 540)"
            style="margin-left: calc((255 * 100%) / 1920)"
            height="100%"
        >
          <lazy-client-only>
            <div class="d-flex flex-column fill-height justify-center align-start"
                 style="row-gap: 40px">
              <template v-if="slide.textColor">
                <article class="carousel_main_page" :style="$display.fontSize(display.height.value, 64) + `; color: ${slide.textColor}`" v-html="slide.title"></article>
                <article class="carousel_main_page" :style="`color: ${slide.textColor}`" v-html="slide.description"></article>
              </template>
              <template v-else>
                <article class="carousel_main_page" :style="$display.fontSize(display.height.value, 64)" v-html="slide.title"></article>
                <article class="carousel_main_page" v-html="slide.description"></article>
              </template>
              <template v-if="slide.link">
                <v-btn  rounded="0" :ripple="false" variant="outlined" :href="slide.link" class="more_info__button" :style="`color: ${slide.buttonTextColor}; background-color: ${slide.buttonColor}`">
                  {{ $t('buttons.details') }}
                </v-btn>
              </template>
            </div>
          </lazy-client-only>
        </v-sheet>
      </template>

    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import {ref, watch, onMounted} from "vue"
import {useDisplay} from "vuetify";
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiCircle} from "@mdi/js";
import {useElementSize, useScreenOrientation} from "@vueuse/core";
import ChevronRight from "~/components/icons/chevronRight.vue";
import ChevronLeft from "~/components/icons/chevronLeft.vue";
import {useMenuColorStore} from "~/store/menuColor";

const props = defineProps({
  slides: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const {orientation} = useScreenOrientation()
const menuColor = useMenuColorStore()
const current = ref(0)
const carousel = ref(null)
const delimitersContainer = ref(null)
const carouselSize = useElementSize(carousel)
const {$display} = useNuxtApp()
const display = useDisplay()
const { mobile, height } = useDisplay()
const getColor = (index) => {
  return `color: ${index === current.value ? '#00EAFC' : '#D9D9D9'}`
}

onMounted(() => {
  if (props.slides.length === 1) {
    menuColor.setColor(props.slides[0].textColor)
  }
})
const carouselHeight = computed(() => {
  return $display.height(display.height.value, 790)
})
watch(carouselSize.height, (value) => {
  if (value > 0) {
    delimitersContainer.value['style'].bottom = `calc((${mobile ? 40 : 80} * 100%) / ${value})`
    delimitersContainer.value['style'].left = mobile.value ? '2.5%' : `13.5%`
  }
})
watch(current, (value) => {
  menuColor.setColor(props.slides[value].textColor)
})
</script>

<style lang="scss" scoped>
.delimiters__container {
  position: absolute;
  display: flex;
  justify-content: space-between;
  column-gap: 15px;
  left: calc(((255 + 150) * 100%) / 1920);
  z-index: 3;
  & .delimiter_button {
    padding: 0;
    height: fit-content;
    width: fit-content;
  }
}

.more_info__button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px !important;
  height: 60px !important;
  font-size: 18px;
  font-weight: 600;
  @media (max-width: 920px) {
    width: 120px !important;
    height: 45px !important;
    font-size: 16px;
  }
}
</style>
