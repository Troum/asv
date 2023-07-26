<template>
  <v-card
      elevation="0"
      :rounded="0"
      class="mx-auto"
  >
    <nuxt-img
        style="min-height: 200px"
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
      <nuxt-img style="min-width: 120px" :src="product.logo"></nuxt-img>
    </v-card-title>
    <v-card-text class="text-secondary-light">
      {{ product.description }}
    </v-card-text>

    <v-card-actions class="px-4">
      <v-btn :to="`/catalog/${product.slug}`" :height="50" elevation="0" :rounded="0" class="bg-info py-3 px-8">
        <span class="text-white">Подробнее</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import Product from "~/models/Product";

defineProps({
  product: {
    type: Object,
    default: () => {
      return new Product()
    }
  }
})
</script>

<style scoped>

</style>
