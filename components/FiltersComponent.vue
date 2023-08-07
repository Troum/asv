<template>
  <v-item-group class="d-flex flex-wrap flex-column-gap-20 flex-row-gap-20">
    <template v-for="filter of filters">
      <v-item v-slot="{ isSelected, toggle }">
        <v-btn @click="setFilter(toggle, filter.value)" elevation="0"
               :ripple="false"
               :class="['py-3 px-4', {'bg-info': isSelected }, {'bg-secondary-light': !isSelected}]"
               :rounded="0">
          <span :class="['text-white font-weight-bold font-size-12', {'mr-2': isSelected}]">{{ filter.title }}</span>
          <template v-if="isSelected">
            <svg-icon size="14" type="mdi" :path="mdiClose" color="#fff">mdi-close</svg-icon>
          </template>
        </v-btn>
      </v-item>
    </template>
  </v-item-group>
</template>

<script setup>
import {useDisplay} from "vuetify";
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiClose} from "@mdi/js";

defineProps({
  filters: {
    type: Array,
    default: []
  }
})

const emit = defineEmits(['setFilter'])
const {$display} = useNuxtApp()
const display = useDisplay()
const setFilter = (toggle, value) => {
  toggle()
  emit('setFilter', value)
}
</script>

<style scoped>

</style>
