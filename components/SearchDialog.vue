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
  <v-dialog max-width="576"
            v-model="status"
            @update:model-value="commonStore.setSearch(false)">
    <v-card color="primary">
      <v-card-text>
        <ais-instant-search
            :search-client="client"
            index-name="product"
        >
          <ais-search-box
              :placeholder="$t('search')"
              class="v-field__input"
          ></ais-search-box>
          <ais-hits>
            <template v-slot="{ items }">
              <v-list lines="one" bg-color="primary">
                <v-list-item
                    @click="commonStore.setSearch(false)"
                    v-for="{ id,title, slug } in items"
                    :to="`/catalog/${slug}`"
                    :key="id"
                    :title="title"
                ></v-list-item>
              </v-list>
            </template>
          </ais-hits>
        </ais-instant-search>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>