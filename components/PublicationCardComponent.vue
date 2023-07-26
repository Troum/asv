<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card :height="420" v-bind="props" elevation="0" class="d-flex align-center justify-space-between rounded-0 pa-0 position-relative">
        <v-card-text class="d-flex flex-column flex-row-gap-20 pl-0 pr-4 py-8 w-62 fill-height bg-primary z-index-2">
          <v-card-title class="pl-4 text-left font-weight-bold text-white letter-spacing-1 font-size-21 title-line"
                        style="white-space: pre-wrap">ЗАГОЛОВОК НОВОСТИ
          </v-card-title>
          <article class="pl-4 font-size-16">
            Наш сервисный центр предоставляет услуги по гарантийному и послегарантийному обслуживанию и ремонту
            оборудования.
          </article>
        </v-card-text>
        <div class="position-relative" style="height: 420px">
          <nuxt-img height="420px" class="w-100 h-100 position-relative z-index-1" src="/doc.png"></nuxt-img>
          <v-fade-transition>
            <div
                v-if="isHovering"
                 style="background: rgba(0, 234, 252, .66); top: 0; bottom: 0"
                 class="d-flex justify-center align-center fill-height position-absolute w-100 z-index-2">
              <NuxtLink :to="`/publications/publication`">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="50" fill="#00EAFC"/>
                  <path
                      d="M64.8169 66.9561L56.1021 58.0703C57.755 55.9896 58.75 53.3443 58.75 50.4643C58.75 43.7879 53.4228 38.3562 46.875 38.3562C40.3271 38.3562 35 43.7879 35 50.4643C35 57.1407 40.3272 62.5724 46.875 62.5724C49.6996 62.5724 52.2939 61.5579 54.3346 59.8725L63.0494 68.7584C63.2935 69.0072 63.6891 69.0072 63.9333 68.7584L64.817 67.8573C65.061 67.6084 65.061 67.2049 64.8169 66.9561ZM46.875 60.0233C41.7054 60.0233 37.5 55.7355 37.5 50.4643C37.5 45.1932 41.7054 40.9053 46.875 40.9053C52.0447 40.9053 56.2501 45.1932 56.2501 50.4643C56.2501 55.7355 52.0447 60.0233 46.875 60.0233Z"
                      fill="white"/>
                </svg>
              </NuxtLink>
            </div>
          </v-fade-transition>
        </div>
      </v-card>
    </template>
  </v-hover>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.title-line {
  position: relative;

  &::before {
    position: absolute;
    display: block;
    height: 70%;
    width: 6px;
    left: 0;
    top: 15%;
    bottom: 15%;
    background: #00EAFC;
    content: '';
  }
}
</style>
