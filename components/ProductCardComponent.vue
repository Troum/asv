<template>
  <v-card
      :width="$display.width(width, 350)"
      height="100%"
      elevation="0"
      :rounded="0"
      class="mx-auto position-relative pb-16"
  >
    <div :style="`display: grid; grid-template-columns: ${$display.width(width, 350)}px; grid-template-rows: ${$display.height(height, 350)}px`">
      <template v-if="Object.hasOwn(product.avatar[0], 'attributes')">
        <div
            :style="`width: 100%; height: 100%; background-image: url('https://dashboard.a-sv.site${product.avatar[0].attributes.url}'); background-size: contain; background-repeat: no-repeat; background-position: center center`"
        ></div>
      </template>
      <template v-else>
        <div
            :style="`width: 100%; height: 100%; background-image: url('https://dashboard.a-sv.site${product.avatar[0].url}'); background-size: contain; background-repeat: no-repeat; background-position: center center`"
        ></div>
      </template>
    </div>
    <v-card-subtitle class="font-size-16 text-info-darken text-uppercase font-weight-bold pt-9" style="white-space: pre-wrap">
      {{ product.subtitle }}
    </v-card-subtitle>
    <v-card-title class="font-size-18 font-weight-bold text-uppercase">
      {{ product.title }}
    </v-card-title>
    <v-card-title>
      <nuxt-img provider="strapi" style="min-width: 120px; max-width: 120px" :src="product.logo"></nuxt-img>
    </v-card-title>
    <v-card-text :style="computedWidth" class="text-secondary-light" v-html="truncated">
    </v-card-text>
    <v-card-actions class="px-4 py-4 position-absolute" style="bottom: 0">
      <v-hover v-slot:default="{ isHovering, props }">
        <v-btn v-bind="props" :to="`/catalog/${product.slug}`" :width="160" :height="40" elevation="0" :rounded="0"
               :class="['bg-primary px-8', { 'bg-info': isHovering }]">
          <span class="text-white font-weight-bold font-size-18" style="font-family: 'Open Sans Condensed Bold', sans-serif">{{ $t('buttons.details') }}</span>
        </v-btn>
      </v-hover>

    </v-card-actions>
  </v-card>
</template>

<script setup>
import Product from "~/models/Product";
import truncate from "truncate-html";
import {computed} from "vue";
import {useDisplay} from "vuetify";

const props = defineProps({
  product: {
    type: Object,
    default: new Product()
  }
})
const {$display} = useNuxtApp()
const { width, height, mobile } = useDisplay()
const truncated = computed(() => {
  return truncate(props.product['description'], 20, {byWords: true})
})
const computedWidth = computed(() => {
  switch (true) {
    case width.value <= 1280:
      return `width: ${width}px`
    default:
      return `width: ${width / 3 - 60}px`
  }
})

</script>

<style scoped>

</style>
