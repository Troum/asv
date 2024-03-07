<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <v-col cols="10" class="d-flex flex-column pa-0 mx-auto position-relative"
             :style="`row-gap: 48px; height: auto; margin-top: ${frameMargin}px`">
        <h2 class="text-uppercase text-center font-size-48" v-html="$t('mainPage.service.title')"></h2>
        <template v-if="mobile">
          <div>
            <div class="d-flex flex-column pa-4 text-center flex-row-gap-40">
              <article>
                {{ $t('mainPage.service.articles.first') }}
              </article>
              <article>
                {{ $t('mainPage.service.articles.second') }}
              </article>
              <article v-html="$t('mainPage.service.articles.third.content', {address: 'info', domain: 'a-sv.site', link: 'mailto:info@asvtrade.by'})">
              </article>
              <article>
                {{ $t('mainPage.service.articles.fourth') }}
              </article>
            </div>
            <div class="position-relative mt-8"
                 style="background: url('/banner.jpg') top center no-repeat; background-size: cover; width: 100%; padding: 40px">
              <div class="d-flex flex-column justify-center align-start text-white z-index-2 position-relative"
                   :style="`row-gap: ${$display.height(display.height.value, 40)}px`">
                <h3 class="text-uppercase font-weight-bold font-size-21 letter-spacing-21"
                    v-html="$t('mainPage.service.articles.list.title')"></h3>
                <ul>
                  <template v-for="(item, index) of tm('mainPage.service.articles.list.items')" :key="index">
                    <li :class="{ 'my-4': index !== 0 && index + 1 !== tm('mainPage.service.articles.list.items').length  }">
                      {{ item }}
                    </li>
                  </template>
                </ul>
              </div>
              <div style="top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,.82)"
                   class="position-absolute z-index-1"></div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="service">
            <div class="d-flex flex-column pa-16 text-center flex-row-gap-40">
              <article>
                {{ $t('mainPage.service.articles.first') }}
              </article>
              <article>
                {{ $t('mainPage.service.articles.second') }}
              </article>
              <article v-html="$t('mainPage.service.articles.third.content', {address: 'info', domain: 'a-sv.site', link: 'mailto:info@a-sv.site'})">
              </article>
              <article>
                {{ $t('mainPage.service.articles.fourth') }}
              </article>
            </div>
            <div class="position-relative"
                 style="background: url('/banner.jpg') top center no-repeat; background-size: cover; width: 100%; padding: 80px">
              <div class="d-flex flex-column justify-center align-start text-white z-index-2 position-relative"
                   :style="`row-gap: ${$display.height(display.height.value, 40)}px`">
                <h3 class="text-uppercase font-weight-bold font-size-21 letter-spacing-21"
                    v-html="$t('mainPage.service.articles.list.title')"></h3>
                <ul>
                  <template v-for="(item, index) of tm('mainPage.service.articles.list.items')" :key="index">
                    <li :class="{ 'my-4': index !== 0 && index + 1 !== tm('mainPage.service.articles.list.items').length  }">
                      {{ item }}
                    </li>
                  </template>
                </ul>
              </div>
              <div class="overlay z-index-1"></div>
            </div>
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {useCommonStore} from "~/store/common";
import {useI18n} from "vue-i18n";
import {useDisplay} from "vuetify";

definePageMeta({
  breadcrumb: 'pages.service.title'
})

defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})

const { $display } = useNuxtApp()
const display = useDisplay()
const {mobile} = useDisplay()
const { locale, tm } = useI18n()
const commonStore = useCommonStore()

commonStore.setTitle(null)
commonStore.setComponent(null)

</script>

<style lang="scss" scoped>
.service {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 45%);
  grid-column-gap: 5%;

  & .overlay {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .8);
  }
}
</style>
