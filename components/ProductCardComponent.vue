<template>
  <v-card
      elevation="0"
      :rounded="0"
      class="mx-auto"
  >
    <nuxt-img provider="strapi"
              style="min-height: 200px; max-height: 200px"
              class="align-end text-white"
              :src="product.avatar"
    >
    </nuxt-img>
    <v-card-subtitle class="font-size-16 text-info-darken text-uppercase font-weight-bold pt-9">
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

    <v-card-actions class="px-4">
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
