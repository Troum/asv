<template>
  <div class="d-flex flex-column justify-center align-start w-full fill-height px-0">
    <div class="px-0">
      <template v-for="breadcrumb of breadcrumbs">
        <NuxtLink
            class="text-white font-weight-bold breadcrumb"
            :to="breadcrumb.link"
        >
          {{ _.isEmpty(tm(breadcrumb.label))  ? breadcrumb.label : tm(breadcrumb.label) }}
        </NuxtLink>
      </template>
      <template v-if="contactComponent">
        <template v-if="mobile">
          <div>
            <v-img max-width="400" :src="contactComponent.logo" class="mx-auto my-8"></v-img>
            <p v-html="contactComponent.content" class="text-white font-size-20 my-5"></p>
          </div>
        </template>
        <template v-else>
          <div class="component" :style="`grid-column-gap: ${$display.width(display.width.value, 220)}px`">
            <p v-html="contactComponent.content" class="text-white font-size-20 my-5"></p>
            <v-img width="200" :src="contactComponent.logo"></v-img>
          </div>
        </template>

      </template>
    </div>
  </div>
</template>

<script setup>
import _ from "lodash";
import {computed, watch, ref} from "vue"
import {useBreadcrumbsStore} from "~/store/breadcrumbs";
import {useRoute} from "vue-router";
import {useDisplay} from "vuetify";
import {useCommonStore} from "~/store/common";
import {useI18n} from "vue-i18n";
const commonStore = useCommonStore()
const route = useRoute()
const {$display} = useNuxtApp()
const display = useDisplay()
const { mobile } = useDisplay()
const {$breadcrumbs} = useNuxtApp()
const breadcrumbsStore = useBreadcrumbsStore()
const { tm } = useI18n()
if (!_.isUndefined($breadcrumbs)) {
  if ($breadcrumbs.value.length) {
    breadcrumbsStore.addBreadcrumbToBreadcrumbs($breadcrumbs.value)
  }
}
const breadcrumbs = computed(() => {
  if (!_.isUndefined($breadcrumbs)) {
    return $breadcrumbs.value.length ? $breadcrumbs.value : breadcrumbsStore.list
  }
  return breadcrumbsStore.list
})

const contactComponent = computed(() => {
  return commonStore.getComponent
})

const title = computed(() => {
  return commonStore.getTitle
})

watch(title, (value) => {
  if (value) {
    if (!_.find(breadcrumbs.value, {link: route.path})) {
      breadcrumbs.value.push({
        current: true,
        label: value,
        link: route.path,
        _path: route.path
      })
    } else {
      if (route.path.includes('publications') || route.path.includes('products')) {
        _.remove(breadcrumbs.value, {link: route.path})

        breadcrumbs.value.push({
          current: true,
          label: value,
          link: route.path,
          _path: route.path
        })
      }
    }
  }
}, {immediate: true})
</script>

<style lang="scss" scoped>
.breadcrumb {
  font-family: "Open Sans Condensed Bold", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: normal;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 2px;
  @media (max-width: 1280px) {
    font-size: 14px;
  }
  &::after {
    content: url("~/assets/images/arrow.svg");
    margin-left: 30px;
    margin-right: 30px;
  }

  &:last-of-type {
    color: #00EAFC !important;

    &::after {
      content: '';
    }
  }

  @media (max-width: 1280px) {
    &::after {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
.component {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
}
</style>
