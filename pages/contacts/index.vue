<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="mx-0 position-relative pr-0 pt-0 pb-0"
           :class="{'page-frames': !mobile, 'px-6': mobile}"
           :style="`margin-top: ${frameMargin}px`">
      <div class="contact-page">
        <div class="py-16">
          <v-card flat>
            <v-card-title class="mb-16 font-weight-bold" :class="{'font-size-36': mobile}">
              {{ $t('contacts.name') }}
            </v-card-title>
            <v-card-text class="mt-16 pa-0 d-flex flex-column flex-row-gap-32">
              <v-card-subtitle v-if="contacts?.sale_contact" style="opacity: 1" class="d-flex flex-column-gap-25">
                <phone/>
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">{{ contacts.sale_contact_title }}</span>
                  <a class="on-hover text-primary text-decoration-none font-weight-bold font-size-20"
                     :href="`tel:${contacts.sale_contact}`">{{ contacts.sale_contact }}</a>
                </div>
              </v-card-subtitle>
              <v-card-subtitle v-if="contacts?.service_contact" style="opacity: 1" class="d-flex flex-column-gap-25">
                <phone/>
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">{{ contacts.service_contact_title }}</span>
                  <a class="on-hover text-primary text-decoration-none font-weight-bold font-size-20"
                     :href="`tel:${contacts.service_contact.replaceAll(' ', '')}`">{{ contacts.service_contact }}</a>
                </div>
              </v-card-subtitle>
              <v-card-subtitle v-if="contacts?.financial_contact" style="opacity: 1" class="d-flex flex-column-gap-25">
                <phone/>
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">{{ contacts.financial_contact_title }}</span>
                  <a class="on-hover text-primary text-decoration-none font-weight-bold font-size-20"
                     :href="`tel:${contacts.financial_contact.replaceAll(' ', '')}`">{{
                      contacts.financial_contact
                    }}</a>
                </div>
              </v-card-subtitle>
              <v-card-subtitle v-if="contacts?.email_contact" style="opacity: 1" class="d-flex flex-column-gap-25">
                <envelop/>
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">{{ contacts.email_contact_title }}</span>
                  <template v-for="email of contactEmails">
                    <a class="on-hover text-white text-decoration-none font-weight-bold font-size-20"
                       :href="`mailto:${email}`">{{ email }}</a>
                  </template>
                </div>
              </v-card-subtitle>
              <v-card-subtitle v-if="contacts?.address_contact" style="opacity: 1" class="d-flex flex-column-gap-25">
                <place/>
                <div class="d-flex flex-column flex-row-gap-10">
                  <span class="text-uppercase font-size-16">{{ contacts.address_contact_title }}</span>
                  <a class="on-hover text-primary text-decoration-none font-weight-bold font-size-20"
                     style="white-space: pre-wrap"
                     href="#" v-html="contacts.address_contact">
                  </a>
                </div>
              </v-card-subtitle>
            </v-card-text>
          </v-card>
        </div>
        <div ref="map" style="filter: grayscale(100%)">
          <template v-if="locale === 'ru'">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1352.7673177295308!2d25.260600502786573!3d54.606350913179725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTTCsDM2JzIyLjgiTiAyNcKwMTUnNDAuOCJF!5e0!3m2!1sru!2sby!4v1701363302018!5m2!1sru!2sby"
                width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
          </template>
          <template v-if="locale === 'lt'">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d2310.866131303371!2d25.2606005!3d54.6063509!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTTCsDM2JzIyLjgiTiAyNcKwMTUnNDAuOCJF!5e0!3m2!1slt!2sby!4v1701363419281!5m2!1slt!2sby"
                width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
          </template>
          <template v-if="locale === 'en'">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d2310.866131303371!2d25.2606005!3d54.6063509!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTTCsDM2JzIyLjgiTiAyNcKwMTUnNDAuOCJF!5e0!3m2!1sen!2sby!4v1701363488626!5m2!1sen!2sby"
                width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
          </template>
        </div>
      </div>
    </v-col>
  </v-container>
</template>

<script setup>
import {computed, ref, watch} from "vue"
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
const props = defineProps({
  frameMargin: {
    type: Number,
    default: 0
  },
  contacts: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const {locale, tm} = useI18n()
const {mobile} = useDisplay()
const map = ref(null)
const {width, height} = useElementSize(map)
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
const contactEmails = computed(() => {
  return props.contacts.email_contact?.split(',') ?? []
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
