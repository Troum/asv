<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="page-frames publications-page" :style="`margin-top: ${frameMargin}px`">
      <client-only>
        <template v-for="(publication, key) of publications.list.slice(0, current)" :key="key">
          <div class="publication">
            <publication-card-component :publication="publication"/>
          </div>
        </template>
      </client-only>
    </v-col>
    <client-only>
      <template v-if="publications.list.length > count">
        <v-col cols="12" class="d-flex justify-center position-relative">
          <v-btn @click="loadMore" :ripple="false" variant="plain" style="opacity: 1;">
            <div class="d-flex align-center justify-center flex-column flex-row-gap-5">
              <span class="font-weight-bold">{{ $t('buttons.loadAll') }}</span>
              <chevron-down />
            </div>
          </v-btn>
        </v-col>
      </template>
    </client-only>
  </v-container>
</template>

<script setup>
import PublicationCardComponent from "~/components/PublicationCardComponent.vue";
import ChevronDown from "~/components/icons/chevronDown.vue";
import {ref, computed} from "vue"
import {usePublicationsStore} from "~/store/publications";
import {useCommonStore} from "~/store/common";
import {useDisplay} from "vuetify";
import {useI18n} from "vue-i18n";
import Publication from "~/models/Publication";
import {useLangStore} from "~/store/lang";

const { locale } = useI18n()
const langStore = useLangStore()
switch (locale.value) {
  case 'en':
    definePageMeta({
      breadcrumb: 'News'
    })
    break;
  case 'ru':
    definePageMeta({
      breadcrumb: 'Все новости'
    })
    break;
  default:
    definePageMeta({
      breadcrumb: 'Naujienos'
    })
}

defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})
const {find} = useStrapi()
const publications = usePublicationsStore()
const commonStore = useCommonStore()
const count = computed(() => {
  return useDisplay().xlAndUp ? 4 : 3
})
const {$dateTime} = useNuxtApp()
const current = ref(count.value)

await find('publications', {
  populate: 'image',
  locale: langStore.getLang ?? locale.value
})
    .then((response) => {
      publications.addItems(response.data.map((item) => {
        return new Publication(
            item.id,
            item.attributes.title,
            item.attributes.subtitle,
            item.attributes.article,
            item.attributes.image.data.attributes.url,
            item.attributes.slug,
            $dateTime.formatDate(item.attributes.createdAt),
        ).toJson()
      }))
    })
const loadMore = () => {
  if (current.value < publications.list.length) {
    current.value += count.value
  }
}
commonStore.setComponent(null)
commonStore.setTitle(null)
</script>

<style lang="scss" scoped>
.publications-page {
  display: flex;
  column-gap: 30px;
  row-gap: 30px;
  flex-wrap: wrap;
  padding-top: 60px;
  & .publication {
    flex: 0 0 calc(33.333% - 30px);
    @media (min-width: 1920px) {
      flex: 0 0 calc(25% - 30px);
    }
  }

}
</style>
