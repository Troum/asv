<template>
  <v-carousel
      v-model="current"
      ref="carousel"
      class="position-relative z-index-4"
      :cycle="true"
      :height="$display.height(display.height.value, 790)"
      hide-delimiters
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
    <div ref="delimitersContainer"
         class="delimiters__container">
      <template v-for="(delimiter, index) of slides.length" :key="delimiter">
        <v-btn @click="current = index" icon variant="plain" style="opacity: 1" class="delimiter_button">
          <svg-icon :style="getColor(index)" size="18" :path="mdiCircle"
                    type="mdi"/>
        </v-btn>
      </template>
    </div>
    <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
    >
      <div class="w-100 fill-height position-relative"
           :class="{'d-flex align-center': mobile}"
           :style="`background-color: ${slide.background}; background-image: url('https://dashboard.a-sv.site${slide.src}'); background-size: ${mobile ? 'cover' : 'contain'}; background-repeat: no-repeat`">
        <template v-if="mobile">
          <v-sheet
              class="z-index-3 position-relative px-3"
              color="transparent"
              height="100%"
          >
            <lazy-client-only>
              <div class="d-flex flex-column fill-height justify-center align-start"
                   style="row-gap: 40px">
                <h2 class="text-white" :style="$display.fontSize(display.height.value, 64)" v-html="slide.title"></h2>
                <p class="text-white font-size-16">{{ slide.description }}</p>
                <template v-if="slide.link">
                  <v-btn  rounded="0" :ripple="false" variant="outlined" :href="slide.link"
                          class="more_info__button">
                    {{ $t('buttons.details') }}
                  </v-btn>
                </template>
              </div>
            </lazy-client-only>
          </v-sheet>
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
                <h2 class="text-white" :style="$display.fontSize(display.height.value, 64)" v-html="slide.title"></h2>
                <p class="text-white font-size-16">{{ slide.description }}</p>
                <template v-if="slide.link">
                  <v-btn  rounded="0" :ripple="false" variant="outlined" :href="slide.link" class="more_info__button">
                    {{ $t('buttons.details') }}
                  </v-btn>
                </template>
              </div>
            </lazy-client-only>
          </v-sheet>
        </template>
      </div>

    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import {ref, watch} from "vue"
import {useDisplay} from "vuetify";
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiCircle} from "@mdi/js";
import {useElementSize} from "@vueuse/core";
import ChevronRight from "~/components/icons/chevronRight.vue";
import ChevronLeft from "~/components/icons/chevronLeft.vue";

defineProps({
  slides: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const current = ref(0)
const carousel = ref(null)
const delimitersContainer = ref(null)
const carouselSize = useElementSize(carousel)
const {$display} = useNuxtApp()
const display = useDisplay()
const { mobile } = useDisplay()
const getColor = (index) => {
  return `color: ${index === current.value ? '#00EAFC' : '#D9D9D9'}`
}

watch(carouselSize.height, (value) => {
  if (value > 0) {
    delimitersContainer.value['style'].bottom = `calc((${mobile ? 60 : 80} * 100%) / ${value})`
    delimitersContainer.value['style'].left = mobile.value ? '2.5%' : `13.5%`
  }
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
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}
</style>
