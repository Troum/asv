<template>
  <v-card
      max-width="350px"
      height="100%"
      elevation="0"
      :rounded="0"
      class="mx-auto position-relative pb-16"
  >
    <div
        :style="`width: calc(350px * 100% / 1920px); min-height: 350px; background-image: url('https://dashboard.a-sv.site${product.avatar}'); background-size: contain; background-repeat: no-repeat; background-position: center center`"
    ></div>
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
const { width, mobile } = useDisplay()
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
