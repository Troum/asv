<template>
  <v-carousel
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
      <div class="d-flex justify-center align-center w-100" :style="`height: ${isIndex ? 110 : 100}%`">
        <template v-for="(item, i) of slide.slides" :key="i">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card :tile="true" :flat="true"
                      v-bind="props"
                      width="25%"
                      :height="isIndex ? '80%' : '100%'"
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
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import {ref} from "vue"
import ChevronRight from "~/components/icons/chevronRight.vue";
import ChevronLeft from "~/components/icons/chevronLeft.vue";
import {useDisplay} from "vuetify";
import Service from "~/models/Service";
import {useServicesStore} from "~/store/services";

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
  }
}
</style>
