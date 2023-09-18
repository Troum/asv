<script setup>
import {
  AisInstantSearch,
  AisHits,
  AisSearchBox,
} from 'vue-instantsearch/vue3/es'

import {useCommonStore} from "~/store/common";
const commonStore = useCommonStore()
const client = useMeilisearchClient()
const status = computed(() => {
  return commonStore.getSearch
})
</script>

<template>
  <v-dialog max-width="576" v-model="status" @update:model-value="commonStore.setSearch(false)">
    <v-card color="primary">
      <v-card-text>
        <ais-instant-search
            :search-client="client"
            index-name="product"
        >
          <ais-search-box
              placeholder="Search here…"
              class="searchbox"
          ></ais-search-box>
          <ais-hits>
            <template v-slot="{ items }">
              <ul>
                <li
                    v-for="{ id,title } in items"
                    :key="id"
                >
                  <h1>{{ title }}</h1>
                </li>
              </ul>
            </template>
          </ais-hits>
        </ais-instant-search>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>