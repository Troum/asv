<template>
  <v-card
      :min-height="width <= 320 ? height * 1.25 : minHeight"
      elevation="0"
      :rounded="0"
      class="mx-auto align-self-baseline"
  >
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <div v-bind="props" class="d-flex align-center justify-center position-relative">
          <div :style="`display: grid; grid-template-columns: ${mobile ? 320 : $display.width(width, 350)}px; grid-template-rows: ${mobile ? 320 : $display.width(width, 350)}px`">
            <div
                :style="`width: 100%; height: 100%; background-image: url('https://dashboard.asvtrade.lt${doctor.avatar}'); background-size: contain; background-repeat: no-repeat; background-position: center center`"
            ></div>
          </div>
          <template v-if="false">
            <v-fade-transition>
              <template v-if="isHovering">
                <v-btn style="height: fit-content; width: fit-content; bottom: 40%; opacity: 1"
                       class="position-absolute"
                       variant="plain" :ripple="false">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z"
                        fill="#00EAFC"/>
                    <path
                        d="M46.25 39.75C46.25 41.4076 45.5915 42.9973 44.4194 44.1694C43.2473 45.3415 41.6576 46 40 46C38.3424 46 36.7527 45.3415 35.5806 44.1694C34.4085 42.9973 33.75 41.4076 33.75 39.75C33.75 38.0924 34.4085 36.5027 35.5806 35.3306C36.7527 34.1585 38.3424 33.5 40 33.5C41.6576 33.5 43.2473 34.1585 44.4194 35.3306C45.5915 36.5027 46.25 38.0924 46.25 39.75Z"
                        fill="white"/>
                    <path
                        d="M20 39.75C20 39.75 27.5 26 40 26C52.5 26 60 39.75 60 39.75C60 39.75 52.5 53.5 40 53.5C27.5 53.5 20 39.75 20 39.75ZM40 48.5C42.3206 48.5 44.5462 47.5781 46.1872 45.9372C47.8281 44.2962 48.75 42.0706 48.75 39.75C48.75 37.4294 47.8281 35.2038 46.1872 33.5628C44.5462 31.9219 42.3206 31 40 31C37.6794 31 35.4538 31.9219 33.8128 33.5628C32.1719 35.2038 31.25 37.4294 31.25 39.75C31.25 42.0706 32.1719 44.2962 33.8128 45.9372C35.4538 47.5781 37.6794 48.5 40 48.5Z"
                        fill="white"/>
                  </svg>
                </v-btn>
              </template>
              <template v-else>
                <v-btn style="height: fit-content; width: fit-content; bottom: 5%; opacity: 1"
                       class="position-absolute"
                       variant="plain" :ripple="false">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                        fill="black"/>
                    <path
                        d="M22.5 20C22.5 20.663 22.2366 21.2989 21.7678 21.7678C21.2989 22.2366 20.663 22.5 20 22.5C19.337 22.5 18.7011 22.2366 18.2322 21.7678C17.7634 21.2989 17.5 20.663 17.5 20C17.5 19.337 17.7634 18.7011 18.2322 18.2322C18.7011 17.7634 19.337 17.5 20 17.5C20.663 17.5 21.2989 17.7634 21.7678 18.2322C22.2366 18.7011 22.5 19.337 22.5 20Z"
                        fill="white"/>
                    <path
                        d="M12 20C12 20 15 14.5 20 14.5C25 14.5 28 20 28 20C28 20 25 25.5 20 25.5C15 25.5 12 20 12 20ZM20 23.5C20.9283 23.5 21.8185 23.1313 22.4749 22.4749C23.1313 21.8185 23.5 20.9283 23.5 20C23.5 19.0717 23.1313 18.1815 22.4749 17.5251C21.8185 16.8687 20.9283 16.5 20 16.5C19.0717 16.5 18.1815 16.8687 17.5251 17.5251C16.8687 18.1815 16.5 19.0717 16.5 20C16.5 20.9283 16.8687 21.8185 17.5251 22.4749C18.1815 23.1313 19.0717 23.5 20 23.5Z"
                        fill="white"/>
                  </svg>
                </v-btn>
              </template>
            </v-fade-transition>
          </template>
        </div>
      </template>
    </v-hover>
    <div style="display: grid; grid-template-columns: 1fr; grid-auto-rows: minmax(120px, auto) 50px minmax(160px, auto) 50px ">
      <v-card-subtitle class="font-size-16 text-info-darken text-initial font-weight-regular pt-9 px-0 text-left"
                       style="white-space: pre-wrap">
        {{ doctor.position }}
      </v-card-subtitle>
      <v-card-title class="font-size-18 font-weight-bold text-uppercase px-0 text-left" style="white-space: pre-wrap">
        {{ doctor.name }}
      </v-card-title>
      <v-card-text class="text-secondary-light px-0 text-left" v-html="description"></v-card-text>
      <v-card-actions class="px-0">
        <v-btn @click="more" style="opacity: 1" :ripple="false" variant="plain" class="px-0">
          <span class="text-info">{{ showMore ? $t('buttons.collapse') : $t('buttons.expand') }}</span>
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup>
import Doctor from "~/models/Doctor";
import {computed} from "vue";
import truncate from "truncate-html";
import {useDisplay, useLocale} from "vuetify";
const { current } = useLocale()
const length = ref(10)
const showMore = ref(false)
const props = defineProps({
  doctor: {
    type: Object,
    default: () => {
      return new Doctor().toJson()
    }
  }
})
const {$display} = useNuxtApp()
const { width, height, mobile, name } = useDisplay()
const more = () => {
  if (showMore.value) {
    length.value = 10
    showMore.value = false
  } else {
    length.value = props.doctor.description.length
    showMore.value = true
  }
}
const description = computed(() => {
  return truncate(props.doctor.description, length.value, {byWords: true})
})
const minHeight = computed(() => {
  switch (name.value) {
    case 'md': return height.value * 0.7534
    case 'lg': return height.value * 0.8334
    case 'xl': return height.value * 0.5334
  }
  return height.value * 0.89
})
</script>

<style scoped>

</style>
