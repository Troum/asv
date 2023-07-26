<template>
  <NuxtLink to="/">
    <v-img class="client-logo" src="/assets/images/client.svg"></v-img>
  </NuxtLink>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.client-logo {
  transition: all .3s ease-in-out;
  filter: grayscale(1);
  &:hover {
    cursor: pointer;
    filter: grayscale(0);
  }
}
</style>
