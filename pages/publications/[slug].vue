<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="mx-0 position-relative page-frames" :style="`margin-top: ${frameMargin}px`">
      <template v-if="timeout">
        Загрузка контента
      </template>
      <template v-else>
        <v-card flat class="px-0" style="padding-top: 60px; padding-bottom: 60px">
          <v-card-title class="d-flex justify-end">
            <v-btn style="opacity: 1;" variant="plain"
                   :ripple="false"
                   class="d-flex align-center font-size-18 font-weight-bold">
              <svg-icon size="26" type="mdi" :path="mdiChevronLeft"/>
              <NuxtLink to="/publications" class="ml-4 text-decoration-none text-primary">{{ $t('buttons.back') }}</NuxtLink>
            </v-btn>
          </v-card-title>
          <v-card-title tag="h1" class="text-uppercase font-size-36 px-0">{{ publication.title }}</v-card-title>
          <v-card-subtitle tag="h4" class="text-uppercase font-size-18 px-0" style="color: #333">
            {{ publication.subtitle }} / {{ publication.createdAt }}
          </v-card-subtitle>
          <v-card-text class="px-0">
            <nuxt-img provider="strapi" class="my-10" style="width: 100%" :src="publication.image"></nuxt-img>
            <article class="text-body-1 text-primary" v-html="publication.article"></article>
          </v-card-text>
        </v-card>
        <v-row class="ma-0 pa-0">
          <v-col class="d-flex justify-center align-center flex-column-gap-82" cols="12">
            <v-btn variant="plain"
                   style="width: fit-content"
                   :ripple="false"
                   :disabled="_.isNull(previous)"
                   :to="`/publications/${previousSlug}`"
                   class="d-flex align-center justify-space-between text-initial px-0">
              <chevron-left/>
              <span class="ml-8">{{ $t('buttons.previous') }}</span>
            </v-btn>
            <v-btn :ripple="false" variant="plain"
                   style="width: fit-content"
                   :disabled="_.isNull(next)"
                   :to="`/publications/${nextSlug}`"
                   class="d-flex align-center justify-space-between text-initial px-0">
              <span class="mr-8">{{ $t('buttons.next') }}</span>
              <chevron-right/>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-col>
  </v-container>
</template>

<script setup>
import _ from "lodash"
import {computed, watch, ref} from "vue"
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiChevronLeft} from "@mdi/js";
import {useCommonStore} from "~/store/common";
import {useRoute, useRouter} from "vue-router";
import Publication from "~/models/Publication";
import ChevronLeft from "~/components/icons/chevronLeft.vue";
import ChevronRight from "~/components/icons/chevronRight.vue";
import {useBreadcrumbsStore} from "~/store/breadcrumbs";
import {useI18n} from "vue-i18n";
import {useLangStore} from "~/store/lang";

defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})
const langStore = useLangStore()
const { locale } = useI18n()
const route = useRoute()
const router = useRouter()
const {find} = useStrapi()
const commonStore = useCommonStore()
const breadcrumbsStore = useBreadcrumbsStore()
const {$dateTime} = useNuxtApp()
const publication = ref({})
const timeout = ref(true)
const previous = ref(null)
const next = ref(null)

commonStore.setComponent(null)

await find(`publications/${route.params.slug}`, {
  populate: 'detailImage',
  locale: langStore.getLang ?? locale.value
})
    .then((response) => {
      publication.value = new Publication(
          response.data.id,
          response.data.attributes.current.title,
          response.data.attributes.current.subtitle,
          response.data.attributes.current.article,
          response.data.attributes.current['detailImage'].url,
          response.data.attributes.current.slug,
          $dateTime.formatDate(response.data.attributes.current.createdAt, langStore.getLang ?? locale.value)
      )
      commonStore.setTitle(publication.value['title'])
      previous.value = Object.hasOwn(response.data.attributes, 'previous') ? response.data.attributes.previous : null
      next.value = response.data.attributes.next
      breadcrumbsStore.removeFromBreadcrumbs(previous.value)
    })
    .then(() => {
      timeout.value = false
    })
const nextSlug = computed(() => {
  if (!_.isNull(next.value)) {
    return next.value?.slug ?? ''
  }
  return ''
})
const previousSlug = computed(() => {
  if (!_.isNull(previous.value)) {
    return previous.value?.slug ?? ''
  }
  return ''
})
watch(locale, async (value) => {
  timeout.value = true

  await find(`publications/${route.params.slug}`, {
    populate: 'detailImage',
    locale: langStore.getLang ?? locale.value
  })
      .then((response) => {
        publication.value = new Publication(
            response.data.id,
            response.data.attributes.current.title,
            response.data.attributes.current.subtitle,
            response.data.attributes.current.article,
            response.data.attributes.current['detailImage'].url,
            response.data.attributes.current.slug,
            $dateTime.formatDate(response.data.attributes.current.createdAt, langStore.getLang ?? locale.value)
        )

        previous.value = Object.hasOwn(response.data.attributes, 'previous') ? response.data.attributes.previous : null
        next.value = response.data.attributes.next
        breadcrumbsStore.removeFromBreadcrumbs(previous.value)
        commonStore.setTitle(publication.value['title'])
      })
      .then(() => {
        timeout.value = false
      })
})

</script>

<style lang="scss" scoped>

</style>
