<template>
  <div class="d-flex flex-column justify-center align-start w-full fill-height px-0">
    <div class="px-0">
      <template v-for="breadcrumb of breadcrumbs">
        <NuxtLink
            class="text-white font-weight-bold breadcrumb"
            :to="breadcrumb.link"
        >
          {{ breadcrumb.label }}
        </NuxtLink>
      </template>
      <template v-if="contactComponent">
        <div class="component" :style="`grid-column-gap: ${$display.width(display.width.value, 220)}px`">
          <p v-html="contactComponent.content" class="text-white font-size-16 my-5"></p>
          <v-img width="200" :src="contactComponent.logo"></v-img>
        </div>
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
const commonStore = useCommonStore()
const route = useRoute()
const {$display} = useNuxtApp()
const display = useDisplay()
const {$breadcrumbs} = useNuxtApp()
const breadcrumbsStore = useBreadcrumbsStore()

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
    if (!_.find(breadcrumbs.value, {_path: route.path})) {
      breadcrumbs.value.push({
        current: true,
        label: value,
        link: route.path,
        _path: route.path
      })
    } else {
      _.remove(breadcrumbs.value, {_path: route.path})
    }
  }
}, {immediate: true})
</script>

<style lang="scss" scoped>
.breadcrumb {
  font-weight: 700;
  font-size: 18px;
  line-height: 115%;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.4em;

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
}
.component {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
}
</style>
