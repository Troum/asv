<template>
  <template v-if="mobile && orientation === 'landscape-primary'">
    <Carousel :items-to-show="2.5" :wrap-around="true" >
      <template #addons>
        <Navigation />
      </template>
      <Slide v-for="(slide, index) of services.list" :key="index">
          <div class="d-flex justify-center align-center w-100 position-relative"
               :style="`overflow: hidden; height: ${isIndex ? 95 : 100}%`">
            <template v-if="mobile">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-card :tile="true" :flat="true"
                          :ripple="false"
                          :hover="false"
                          :to="`/manufacturer/${slide.slug}`"
                          v-bind="props"
                          width="100%"
                          :height="isIndex ? '95%' : '100%'"
                          :class="['rounded-0 hover', { 'on': isHovering }]">
                    <v-card-text class="d-flex align-center justify-center pa-0 fill-height">
                      <nuxt-img provider="strapi"
                                width="200px"
                                :src="slide.logo"></nuxt-img>
                      <div class="line"></div>
                    </v-card-text>
                  </v-card>
                </template>
              </v-hover>
            </template>
            <template v-else>
              <template v-for="(item, i) of slide.slides" :key="i">
                <v-hover>
                  <template v-slot:default="{ isHovering, props }">
                    <v-card :tile="true" :flat="true"
                            :ripple="false"
                            :hover="false"
                            :to="`/manufacturer/${item.slug}`"
                            v-bind="props"
                            :width="`${100 / slide.slides.length >= 25 ? 100 / slide.slides.length : 25}%`"
                            :height="isIndex ? '95%' : '100%'"
                            :class="['rounded-0 hover', { 'on': isHovering }]">
                      <v-card-text class="d-flex align-center justify-center pa-0 fill-height">
                        <nuxt-img provider="strapi"
                                  width="200px"
                                  :src="item.logo"></nuxt-img>
                        <div class="line"></div>
                      </v-card-text>
                    </v-card>
                  </template>
                </v-hover>
              </template>
            </template>
          </div>
      </Slide>
    </Carousel>
  </template>
  <template v-else-if="mobile && orientation === 'portrait-primary'">
    <v-carousel
        class="z-index-5"
        v-model="current"
        :height="`${height}px`"
        :cycle="true"
        :hide-delimiters="true">
      <template v-slot:prev="{ props }">
        <v-btn
            :ripple="false"
            style="opacity: 1; color: #C4C4C4"
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
            style="opacity: 1; color: #C4C4C4"
            icon
            variant="plain"
            @click="props.onClick"
        >
          <chevron-right/>
        </v-btn>
      </template>
      <v-carousel-item v-for="(slide, index) of services.list" :key="index">
        <div class="d-flex justify-center align-center w-100 position-relative"
             :style="`overflow: hidden; height: ${isIndex ? 95 : 100}%`">
          <template v-if="mobile">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card :tile="true" :flat="true"
                        :ripple="false"
                        :hover="false"
                        :to="`/manufacturer/${slide.slug}`"
                        v-bind="props"
                        width="100%"
                        :height="isIndex ? '95%' : '100%'"
                        :class="['rounded-0 hover', { 'on': isHovering }]">
                  <v-card-text class="d-flex align-center justify-center pa-0 fill-height">
                    <nuxt-img provider="strapi"
                              width="200px"
                              :src="slide.logo"></nuxt-img>
                    <div class="line"></div>
                  </v-card-text>
                </v-card>
              </template>
            </v-hover>
          </template>
          <template v-else>
            <template v-for="(item, i) of slide.slides" :key="i">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-card :tile="true" :flat="true"
                          :ripple="false"
                          :hover="false"
                          :to="`/manufacturer/${item.slug}`"
                          v-bind="props"
                          :width="`${100 / slide.slides.length >= 25 ? 100 / slide.slides.length : 25}%`"
                          :height="isIndex ? '95%' : '100%'"
                          :class="['rounded-0 hover', { 'on': isHovering }]">
                    <v-card-text class="d-flex align-center justify-center pa-0 fill-height">
                      <nuxt-img provider="strapi"
                                width="200px"
                                :src="item.logo"></nuxt-img>
                      <div class="line"></div>
                    </v-card-text>
                  </v-card>
                </template>
              </v-hover>
            </template>
          </template>
        </div>
      </v-carousel-item>
    </v-carousel>
  </template>
  <template v-else>
    <v-carousel
        class="z-index-5"
        v-model="current"
        :height="`${height}px`"
        :cycle="true"
        :hide-delimiters="true">
      <template v-slot:prev="{ props }">
        <v-btn
            :ripple="false"
            style="opacity: 1; color: #C4C4C4"
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
            style="opacity: 1; color: #C4C4C4"
            icon
            variant="plain"
            @click="props.onClick"
        >
          <chevron-right/>
        </v-btn>
      </template>
      <v-carousel-item v-for="(slide, index) of services.list" :key="index">
        <div class="d-flex justify-center align-center w-100 position-relative"
             :style="`overflow: hidden; height: ${isIndex ? 95 : 100}%`">
          <template v-if="mobile">
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card :tile="true" :flat="true"
                        :ripple="false"
                        :hover="false"
                        :to="`/manufacturer/${slide.slug}`"
                        v-bind="props"
                        width="100%"
                        :height="isIndex ? '95%' : '100%'"
                        :class="['rounded-0 hover', { 'on': isHovering }]">
                  <v-card-text class="d-flex align-center justify-center pa-0 fill-height">
                    <nuxt-img provider="strapi"
                              width="200px"
                              :src="slide.logo"></nuxt-img>
                    <div class="line"></div>
                  </v-card-text>
                </v-card>
              </template>
            </v-hover>
          </template>
          <template v-else>
            <template v-for="(item, i) of slide.slides" :key="i">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-card :tile="true" :flat="true"
                          :ripple="false"
                          :hover="false"
                          :to="`/manufacturer/${item.slug}`"
                          v-bind="props"
                          :width="`${100 / slide.slides.length >= 25 ? 100 / slide.slides.length : 25}%`"
                          :height="isIndex ? '95%' : '100%'"
                          :class="['rounded-0 hover', { 'on': isHovering }]">
                    <v-card-text class="d-flex align-center justify-center pa-0 fill-height">
                      <nuxt-img provider="strapi"
                                width="200px"
                                :src="item.logo"></nuxt-img>
                      <div class="line"></div>
                    </v-card-text>
                  </v-card>
                </template>
              </v-hover>
            </template>
          </template>
        </div>
      </v-carousel-item>
    </v-carousel>
  </template>
</template>

<script setup>
import {Carousel, Slide, Navigation} from "vue3-carousel"
import {ref} from "vue"
import ChevronRight from "~/components/icons/chevronRight.vue";
import ChevronLeft from "~/components/icons/chevronLeft.vue";
import {useDisplay} from "vuetify";
import {useServicesStore} from "~/store/services";
import {useScreenOrientation} from "@vueuse/core";

defineProps({
  height: {
    type: Number,
    default: 100
  },
  isIndex: {
    type: Boolean,
    default: false
  }
})
const {find} = useStrapi()
const {$display} = useNuxtApp()
const services = useServicesStore()
const display = useDisplay()
const current = ref(0)
const { mobile } = useDisplay()
const { orientation } = useScreenOrientation()
</script>

<style lang="scss" scoped>

.hover {
  transition: margin-top .3s ease-in-out;

  .line {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 6px;
    background-color: #EEE;
    transition: background-color .3s ease-in-out;
  }

  &.on {
    margin-top: -10px;
    cursor: pointer;

    & .line {
      background-color: #00EAFC;
    }
    & > .v-card__overlay {
      opacity: 0 !important;
    }
  }
}
</style>
