<template>
  <div class="d-flex flex-column justify-center align-start w-full fill-height px-0">
    <div class="px-0">
      <client-only>
        <template v-for="breadcrumb of breadcrumbs">
          <NuxtLink
              class="text-white font-weight-bold breadcrumb"
              :to="breadcrumb.link"
          >
            {{ breadcrumb.label }}
          </NuxtLink>
        </template>
      </client-only>
      <template v-if="component">
        <div class="component" :style="`grid-column-gap: ${$display.width(display.width.value, 220)}px`">
          <p v-html="component.content" class="text-white font-size-16 my-5"></p>
          <nuxt-img :src="component.logo"></nuxt-img>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import _ from "lodash";
import {computed, ref} from "vue"
import {useBreadcrumbsStore} from "~/store/breadcrumbs";
import {useRoute} from "vue-router";
import {useDisplay} from "vuetify";
const component = ref(null)
const route = useRoute()
const {$listen, $display} = useNuxtApp()
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

$listen('set:title', (title) => {
  if (!_.find(breadcrumbs.value, {label: title})) {
    breadcrumbs.value.push({
      current: true,
      label: title,
      link: route.path,
      _path: route.path
    })
  }
})

$listen('set:component', (object) => {
  component.value = object
})

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
