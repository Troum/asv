<template>
  <template v-if="!mobile">
    <Carousel :autoplay="1000" :itemsToShow="6" :wrapAround="true" :transition="500">
      <Slide v-for="(client, key) of clients.slice(0, current)" :key="key">
        <client-card-component :client="client"/>
      </Slide>
    </Carousel>
  </template>
  <template v-else>
    <Carousel :autoplay="1000" :transition="500" :itemsToShow="1" :wrapAround="true" snapAlign="center">
      <Slide v-for="(client, key) of clients.slice(0, current)" :key="key">
        <client-card-component :client="client"/>
      </Slide>
    </Carousel>
  </template>
</template>

<script setup>
import { Carousel, Slide } from 'vue3-carousel';
import {useDisplay} from "vuetify";
defineProps({
  current: {
    type: Number,
    default: 3
  },
  clients: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const { mobile } = useDisplay()
</script>
<style lang="scss" scoped>
.carousel__track {
  transform-style: preserve-3d;
}
</style>
