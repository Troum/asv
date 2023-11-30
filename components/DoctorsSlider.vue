<template>
  <Carousel snapAlign="start" :itemsToShow="mobile ? 1 : 3" :transition="500">
    <Slide v-for="(doctor, key) of doctors" :key="key">
      <doctor-card-component :doctor="doctor"/>
    </Slide>
  </Carousel>
</template>

<script setup>
import { Carousel, Slide } from 'vue3-carousel';
import {useDisplay} from "vuetify";
import DoctorCardComponent from "~/components/DoctorCardComponent.vue";
defineProps({
  doctors: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const { mobile } = useDisplay()
</script>
