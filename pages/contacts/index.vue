<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="mx-0 position-relative pr-0 pt-0 pb-0"
           :class="{'page-frames': !mobile, 'px-6': mobile}"
           :style="`margin-top: ${frameMargin}px`">
      <div class="contact-page">
        <div class="py-16">
          <v-card flat>
            <v-card-title class="mb-16" :class="{'font-size-36': mobile}">
              {{ $t('contacts.name') }}
            </v-card-title>
            <v-card-text class="mt-16 pa-0 d-flex flex-column flex-row-gap-32">
              <v-card-subtitle style="opacity: 1" class="d-flex flex-column-gap-25">
                <phone/>
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">{{ $t('salesDepartment') }}</span>
                  <a class="on-hover text-primary text-decoration-none font-weight-medium font-size-20"
                     href="tel:+37068655420">+370 686 55 420</a>
                </div>
              </v-card-subtitle>
              <v-card-subtitle style="opacity: 1" class="d-flex flex-column-gap-25">
                <phone/>
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">{{ $t('serviceDepartment') }}</span>
                  <a class="on-hover text-primary text-decoration-none font-weight-medium font-size-20"
                     href="tel:+375291661880">+375 29 166 18 80</a>
                </div>
              </v-card-subtitle>
              <v-card-subtitle style="opacity: 1" class="d-flex flex-column-gap-25">
                <phone/>
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">{{ $t('financialDepartment') }}</span>
                  <a class="on-hover text-primary text-decoration-none font-weight-medium font-size-20"
                     href="tel:+370604855564">+370 604 855564</a>
                </div>
              </v-card-subtitle>
              <v-card-subtitle style="opacity: 1" class="d-flex flex-column-gap-25">
                <envelop />
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">e-mail</span>
                  <a class="on-hover text-primary text-decoration-none font-weight-medium font-size-20"
                     href="mailto:info@asvtrade.lt">info@asvtrade.lt</a>
                </div>
              </v-card-subtitle>
              <v-card-subtitle style="opacity: 1" class="d-flex flex-column-gap-25">
                <place />
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">{{ $t('titles.address') }}</span>
                  <a class="on-hover text-primary text-decoration-none font-weight-medium font-size-20"
                     style="white-space: pre-wrap"
                     href="#">
                    Ул. П. Жвиркос 6-2,<br> ЛТ-02223 Вильнюс
                  </a>
                </div>
              </v-card-subtitle>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-col>
  </v-container>
</template>

<script setup>
import {ref, watch} from "vue"
import MapComponent from "~/components/MapComponent.vue";
import Phone from "~/components/icons/phone.vue";
import Envelop from "~/components/icons/envelop.vue";
import {useElementSize} from "@vueuse/core";
import {useCommonStore} from "~/store/common";
import Place from "~/components/icons/place.vue";
import {useI18n} from "vue-i18n";
import {useDisplay} from "vuetify";
definePageMeta({
  breadcrumb: 'pages.contacts.title'
})
defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})
const { locale, tm } = useI18n()
const { mobile } = useDisplay()
const map = ref(null)
const { width, height } = useElementSize(map)
const commonStore = useCommonStore()
const description = computed(() => {
  return tm('contacts.description')
})
commonStore.setComponent({
  content: description.value,
  logo: '/logo-w.svg'
})
commonStore.setTitle(null)

watch(locale, () => {
  commonStore.setComponent({
    content: description.value,
    logo: '/logo-w.svg'
  })
})
</script>

<style lang="scss" scoped>
.contact-page {
  display: grid;
  grid-template-columns: calc((100% - 55%) - 40px) calc((100% - 45%) - 40px);
  grid-column-gap: 80px;
  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
}
</style>
