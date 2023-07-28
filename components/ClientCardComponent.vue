<template>
  <NuxtLink :href="client.url">
    <nuxt-img provider="strapi" class="client-logo" :src="client.logo"></nuxt-img>
  </NuxtLink>
</template>

<script setup>
import Client from "~/models/Client";

defineProps({
  client: {
    type: Object,
    default: new Client()
  }
})
</script>

<style lang="scss" scoped>
.client-logo {
  transition: all .3s ease-in-out;
  filter: grayscale(1);
  &:hover {
    cursor: pointer;
    filter: grayscale(0);
  }
}
</style>
