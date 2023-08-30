<template>
  <v-item-group class="d-flex flex-wrap flex-column-gap-20 flex-row-gap-20">
    <template v-if="!_.isNull(serviceFilter)">
      <v-item>
        <v-btn :ripple="false"
               class="py-3 px-4 bg-info"
               :rounded="0">
          <span class="text-white font-weight-bold font-size-12 mr-2">{{ serviceFilter.title }}</span>
          <svg-icon size="14" type="mdi" :path="mdiClose" color="#fff">mdi-close</svg-icon>
        </v-btn>
      </v-item>
    </template>
    <template v-for="filter of filters">
      <v-item v-slot="{ isSelected, toggle }">
        <v-btn @click="setFilter(toggle, filter.value, isSelected)" elevation="0"
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
import {useCommonStore} from "~/store/common";
import _ from "lodash"

defineProps({
  filters: {
    type: Array,
    default: []
  }
})

const emit = defineEmits(['setFilter'])
const {$display} = useNuxtApp()
const display = useDisplay()
const commonStore = useCommonStore()
const setFilter = (toggle, value, isSelected) => {
  toggle()
  if (isSelected) {
    emit('setFilter', 'all')
  } else {
    emit('setFilter', value)
  }

}
const serviceFilter = computed(() => {
  return commonStore.getServiceFilter
})
</script>

<style scoped>

</style>
