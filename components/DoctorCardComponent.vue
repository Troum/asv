<template>
  <v-card
      elevation="0"
      :rounded="0"
      class="mx-auto"
  >
    <nuxt-img
        style="min-height: 200px"
        class="align-end text-white"
        :src="doctor.avatar"
    >
    </nuxt-img>
    <v-card-subtitle class="font-size-16 text-info-darken text-uppercase font-weight-bold pt-9">
      {{ doctor.position }}
    </v-card-subtitle>
    <v-card-title class="font-size-18 font-weight-bold text-uppercase">
      {{ doctor.name }}
    </v-card-title>
    <v-card-text class="text-secondary-light">
      {{ doctor.description }}
    </v-card-text>

    <v-card-actions class="px-4">
      <v-btn :height="50" elevation="0" :rounded="0" class="bg-info py-3 px-8">
        <span class="text-white">Подробнее</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import Doctor from "~/models/Doctor";

defineProps({
  doctor: {
    type: Object,
    default: () => {
      return new Doctor()
    }
  }
})
</script>

<style scoped>

</style>
