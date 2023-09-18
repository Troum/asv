<template>
  <v-item-group :model-value="all" class="d-flex flex-wrap flex-column-gap-20 flex-row-gap-20">
    <template v-if="!_.isNull(serviceFilter)">
      <v-item>
        <v-btn :ripple="false"
               :height="50"
               class="py-3 px-4 bg-info"
               :rounded="0">
          <span class="text-white font-weight-bold font-size-18 mr-2">{{ serviceFilter.title }}</span>
          <svg-icon size="14" type="mdi" :path="mdiClose" color="#fff">mdi-close</svg-icon>
        </v-btn>
      </v-item>
    </template>
    <template v-for="filter of filters">
      <template v-if="queryFilter">
          <v-btn @click="setFilter(filter.value)" elevation="0"
                 :height="50"
                 :ripple="false"
                 :class="`py-3 px-4 ${queryFilter === filter.value ? 'bg-info' : 'bg-secondary-light'}`"
                 :rounded="0">
            <span :class="['text-white font-weight-bold font-size-18', {'mr-2': queryFilter === filter.value}]">{{ filter.title }}</span>
            <template v-if="queryFilter === filter.value">
              <svg-icon size="14" type="mdi" :path="mdiClose" color="#fff">mdi-close</svg-icon>
            </template>
          </v-btn>
        </template>
        <template v-else>
          <v-btn @click="setFilter('all')" elevation="0"
                 :height="50"
                 :ripple="false"
                 :class="`py-3 px-4 ${filter.value === 'all' ? 'bg-info' : 'bg-secondary-light'}`"
                 :rounded="0">
            <span :class="['text-white font-weight-bold font-size-18', {'mr-2': isSelected}]">{{ filter.title }}</span>
            <template v-if="filter.value === 'all'">
              <svg-icon size="14" type="mdi" :path="mdiClose" color="#fff">mdi-close</svg-icon>
            </template>
          </v-btn>
        </template>
    </template>
  </v-item-group>
</template>

<script setup>
import {onMounted, computed, ref} from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiClose} from "@mdi/js";
import {useCommonStore} from "~/store/common";
import _ from "lodash"
import {arrayMoveMutable} from "array-move";

const props = defineProps({
  filters: {
    type: Array,
    default: []
  }
})
const all = ref(true)
const emit = defineEmits(['setFilter'])
const {$display} = useNuxtApp()
const commonStore = useCommonStore()

const setFilter = (value) => {
  useRouter().push(`?filter=${value}`).then(() => emit('setFilter', value))
}
const serviceFilter = computed(() => {
  return commonStore.getServiceFilter
})
const queryFilter = computed(() => {
  return useRoute().query.hasOwnProperty('filter') ? useRoute().query.filter : 'all'
})
onMounted(() => {
  const allIndex = _.findIndex(props.filters, {value: 'all'})
  arrayMoveMutable(props.filters, allIndex, 0)
  emit('setFilter', queryFilter.value)
})
</script>

<style scoped>

</style>
