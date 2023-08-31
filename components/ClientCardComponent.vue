<template>
  <NuxtLink :href="client.url">
    <template v-if="mobile">
      <nuxt-img provider="strapi"
                style="max-width: 100%"
                class="client-logo" :src="client.logo"></nuxt-img>
    </template>
    <template v-else>
      <nuxt-img provider="strapi"
                class="client-logo" :src="client.logo"></nuxt-img>
    </template>

  </NuxtLink>
</template>

<script setup>
import Client from "~/models/Client";
import {useDisplay} from "vuetify";

defineProps({
  client: {
    type: Object,
    default: new Client()
  }
})

const { mobile } = useDisplay()

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
