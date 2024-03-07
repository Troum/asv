<template>
  <v-layout class="asv rounded rounded-md">
    <template v-if="mobile">
      <v-navigation-drawer v-model="drawer"
                           location="right"
                           :temporary="true"
                           @click="drawer = false" color="secondary">
        <div class="d-flex justify-center align-center flex-column position-relative">
          <v-btn color="#fff" class="position-absolute" icon variant="plain"
                 :ripple="false" style="top: -7.5%; right: -30.5%">
            <svg-icon type="mdi" :path="mdiClose" size="24"/>
          </v-btn>
          <div class="d-flex justify-center align-center flex-row-gap-4">
            <v-btn variant="plain" icon
                   @click="setLocale('ru')"
                   :ripple="false" style="opacity: 1"
                   :class="`lang_link font-weight-bold text-uppercase pa-0 ${locale === 'ru' ? 'active__lang' : ''}`">RU
            </v-btn>
            <v-btn variant="plain" icon
                   @click="setLocale('en')"
                   :ripple="false" style="opacity: 1"
                   :class="`lang_link font-weight-bold text-uppercase pa-0 ${locale === 'en' ? 'active__lang' : ''}`">EN
            </v-btn>
          </div>
          <NuxtLink to="/"
                    transition="fade"
                    class="text-h6 my-6 d-flex align-center text-uppercase text-decoration-none font-weight-bold text-white on-hover">
            {{ $t('pages.main.title') }}
          </NuxtLink>
          <template v-for="item of menu">
            <NuxtLink :to="item.route"
                      transition="fade"
                      class="text-h6 my-6 d-flex align-center text-uppercase text-decoration-none font-weight-bold text-white on-hover">
              {{ item.title }}
            </NuxtLink>
          </template>
          <div class="d-flex align-center justify-center flex-wrap">
            <template v-for="(social, index) of socialNetworks" :key="index">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-btn v-bind="props" icon variant="plain" :ripple="false" style="opacity: 1" :href="social.href">
                    <svg-icon type="mdi" :class="isHovering ? 'text-info' : 'text-white'"
                              :path="social.icon"></svg-icon>
                  </v-btn>
                </template>
              </v-hover>
            </template>
          </div>
        </div>
      </v-navigation-drawer>
    </template>
    <template v-else>
      <v-navigation-drawer v-model="drawer"
                           location="right"
                           :temporary="true"
                           @click="drawer = false"
                           :width="$display.socialBar(display.width.value, 320)" color="secondary">
        <div class="d-flex justify-center align-center flex-column position-relative">
          <v-btn color="#fff" class="position-absolute" icon variant="plain"
                 :ripple="false" style="top: -30%; right: -25%">
            <svg-icon type="mdi" :path="mdiClose" size="24"/>
          </v-btn>
          <NuxtLink to="/"
                    transition="fade"
                    class="text-h6 my-6 d-flex align-center text-uppercase text-decoration-none font-weight-bold text-white on-hover">
            {{ $t('pages.main.title') }}
          </NuxtLink>
          <template v-for="item of menu">
            <NuxtLink :to="item.route"
                      transition="fade"
                      class="text-h6 my-6 d-flex align-center text-uppercase text-decoration-none font-weight-bold text-white on-hover">
              {{ item.title }}
            </NuxtLink>
          </template>
        </div>
      </v-navigation-drawer>
    </template>

    <template v-if="!mobile">
      <v-navigation-drawer style="z-index: 9" class="d-flex align-center justify-center"
                           location="left"
                           :permanent="true"
                           :width="$display.socialBar(display.width.value, 150)" color="secondary">
        <div ref="networksContainer" class="network__container">
          <div ref="sloganContainer" class="network__container-slogan">
            <h1 ref="slogan" class="text-uppercase text-accent font-size-18">{{ $t('titles.networks') }}</h1>
          </div>
          <div class="network__container-line"></div>
          <div class="d-flex align-center justify-center flex-column">
            <template v-for="(social, index) of socialNetworks" :key="index">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-btn v-bind="props" icon variant="plain" :ripple="false" style="opacity: 1" :href="social.href">
                    <svg-icon type="mdi" :class="isHovering ? 'text-info' : 'text-white'"
                              :path="social.icon"></svg-icon>
                  </v-btn>
                </template>
              </v-hover>
            </template>
          </div>
        </div>
      </v-navigation-drawer>
    </template>
    <v-app-bar :fixed="true" elevation="0"
               :height="$display.navBar(display.height.value, mobile ? (orientation === 'landscape-primary' ? 250 : 150) : 157)">
      <div class="appbar">
        <NuxtLink to="/">
          <v-img
              :width="$display.logo(display.width.value, mobile ? (orientation === 'landscape-primary' ? 250 : 500) : 200)"
              src="/logo.svg"></v-img>
        </NuxtLink>
        <template v-if="orientation === 'landscape-primary'">
          <div class="d-flex justify-self-end align-center">
            <v-btn style="opacity: 1; text-transform: initial; font-size: 18px; margin-right: 20px" variant="plain"
                   :class="{}"
                   @click="openSearch"
                   :ripple="false"
                   class="d-flex align-center">
              <span class="mr-4 font-size-20">{{ $t('search') }}</span>
              <svg-icon size="26" type="mdi" :path="mdiMagnify"/>
            </v-btn>
            <template v-if="mobile">
              <v-btn @click="drawer = !drawer" class="d-flex align-center my-auto px-0" icon variant="text"
                     :ripple="false"
                     style="opacity: 1; width: fit-content;">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M0 8.7757H20V12.1745H0V8.7757ZM0 0.278809H26.6667V3.67757H0V0.278809ZM0 20.6714H12.0583V17.2726H0V20.6714Z"
                      fill="#000"/>
                </svg>
              </v-btn>
            </template>
          </div>
        </template>
        <template v-else>
          <v-btn style="opacity: 1; text-transform: initial; font-size: 18px" variant="plain"
                 :class="{}"
                 @click="openSearch"
                 :ripple="false"
                 class="d-flex align-center">
            <span class="mr-4 font-size-20">{{ $t('search') }}</span>
            <svg-icon size="26" type="mdi" :path="mdiMagnify"/>
          </v-btn>
          <template v-if="mobile">
            <v-btn @click="drawer = !drawer" class="d-flex align-center my-auto px-0" icon variant="text"
                   :ripple="false"
                   style="opacity: 1; width: fit-content;">
              <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0 8.7757H20V12.1745H0V8.7757ZM0 0.278809H26.6667V3.67757H0V0.278809ZM0 20.6714H12.0583V17.2726H0V20.6714Z"
                    fill="#000"/>
              </svg>
            </v-btn>
          </template>
        </template>
        <template v-if="!mobile">
          <div ref="phonesContainer" class="d-flex align-center phones__container">
            <div class="d-flex flex-column justify-center align-end"
                 style="font-family: 'Open Sans Condensed Bold', sans-serif">
              <span class="font-weight-bold text-uppercase font-size-16">{{ contacts.sale_contact_title }}</span>
              <span class="font-weight-bold text-uppercase font-size-16">{{ contacts.service_contact_title }}</span>
            </div>
            <div ref="phoneSeparator" class="separator"></div>
            <div class="d-flex flex-column justify-center align-start">
              <a :href="`tel:${contacts.sale_contact.replaceAll(' ', '')}`"
                 class="phone_link font-weight-bold text-uppercase font-size-16">{{
                  contacts.sale_contact
                }}</a>
              <a :href="`tel:${contacts.service_contact.replaceAll(' ', '')}`"
                 class="phone_link font-weight-bold text-uppercase font-size-16">
                {{ contacts.service_contact }}
              </a>
            </div>
          </div>
          <div ref="phonesContainer" class="d-flex align-center langs__container">
            <div class="d-flex flex-column justify-center align-end flex-row-gap-1">
              <lt/>
              <ru/>
              <us/>
            </div>
            <div ref="langSeparator" class="separator"></div>
            <div class="d-flex flex-column justify-center align-start flex-row-gap-4">
              <v-btn variant="plain" icon
                     @click="setLocale('ru')"
                     :ripple="false" style="opacity: 1; width: fit-content; height: fit-content"
                     :class="`lang_link font-weight-bold text-uppercase font-size-16 pa-0 ${locale === 'ru' ? 'active__lang' : ''}`">
                RU
              </v-btn>
              <v-btn variant="plain" icon
                     @click="setLocale('en')"
                     :ripple="false" style="opacity: 1; width: fit-content; height: fit-content"
                     :class="`lang_link font-weight-bold text-uppercase font-size-16 pa-0 ${locale === 'en' ? 'active__lang' : ''}`">
                EN
              </v-btn>
            </div>
            <div class="d-flex flex-column justify-center align-center flex-row-gap-4 ml-12">
              <v-btn variant="plain" icon
                     @click="drawer = true"
                     :ripple="false" style="opacity: 1" class="lang_link font-weight-bold text-uppercase pa-0">
                <svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M0 8.7757H20V12.1745H0V8.7757ZM0 0.278809H26.6667V3.67757H0V0.278809ZM0 20.6714H12.0583V17.2726H0V20.6714Z"
                      fill="#000"/>
                </svg>
              </v-btn>
            </div>
          </div>
        </template>
      </div>
    </v-app-bar>
    <client-only>
      <template v-if="isIndex">
        <template v-if="!mobile">
          <div class="z-index-5 position-absolute menu-bar"
               :style="`height: ${$display.height(display.height.value, 120)}px; top: ${$display.navBar(display.height.value, 157)}px; width: ${$display.footer(display.width.value, $display.socialBar(display.width.value, 150))}px; margin-left: ${$display.socialBar(display.width.value, 130)}px`">
            <div class="py-15"
                 :style="`display: grid; grid-template-columns: repeat(${menu.length + 1}, auto); grid-column-gap: 32px; grid-template-rows: max-content`">
              <template v-for="item of menu">
                <template v-if="item.route.includes('catalog')">
                  <v-menu :open-on-hover="true"
                          style="transition: background-color 0.3s ease-in-out; background-color: rgba(0,0,0, .84)">
                    <template v-slot:activator="{ props }">
                      <NuxtLink :to="item.route"
                                v-bind="props"
                                transition="fade"
                                :style="`--menu-text-color: ${menuTextColor}`"
                                class="d-flex align-center text-uppercase text-decoration-none font-weight-bold on-hover font-size-20 on-hover menu">
                        {{ item.title }}
                      </NuxtLink>
                    </template>
                    <div class="d-flex flex-column mt-5 pa-4" style="row-gap: 15px;">
                      <template v-for="(filter, index) in filters" :key="index">
                        <NuxtLink :to="`${item.route}?filter=${filter.value}`"
                                  transition="fade"
                                  class="d-flex align-center text-uppercase text-decoration-none font-weight-bold on-hover in_menu font-size-20">
                          {{ filter.title }}
                        </NuxtLink>
                      </template>
                    </div>
                  </v-menu>
                </template>
                <template v-else>
                  <NuxtLink :to="item.route"
                            transition="fade"
                            :style="`--menu-text-color: ${menuTextColor}`"
                            class="d-flex align-center text-uppercase text-decoration-none font-weight-bold on-hover font-size-20">
                    {{ item.title }}
                  </NuxtLink>
                </template>
              </template>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <template v-if="commonStore.getComponent">
          <v-img class="position-absolute breadcrumbs-bar"
                 src="/breadcrumbs-bg.png"
                 ref="image"
                 :cover="true"
                 :min-height="120"
                 :width="mobile ? display.width.value : $display.footer(display.width.value, $display.socialBar(display.width.value, 150))"
                 :style="`top: ${$display.navBar(display.height.value, 157)}px; margin-left: ${mobile ? 0 : $display.socialBar(display.width.value, 150)}px; padding-bottom: ${commonStore.getComponent ? 60 : 0}px; padding-top: ${commonStore.getComponent ? 60 : 0}px`">
            <breadcrumbs-component/>
          </v-img>
        </template>
        <template v-else>
          <v-img class="position-absolute breadcrumbs-bar"
                 src="/breadcrumbs-bg.png"
                 ref="image"
                 :cover="true"
                 :max-height="mobile ? 200 : 120"
                 :min-height="mobile ? 120 : 0"
                 :width="mobile ? display.width.value : $display.footer(display.width.value, $display.socialBar(display.width.value, 150))"
                 :style="`top: ${$display.navBar(display.height.value, 157)}px; margin-left: ${mobile ? 0 : $display.socialBar(display.width.value, 150)}px; padding-bottom: ${commonStore.getComponent ? 60 : 0}px; padding-top: ${commonStore.getComponent ? 60 : 0}px`">
            <breadcrumbs-component/>
          </v-img>
        </template>
      </template>
    </client-only>
    <v-main class="d-flex flex-column align-center justify-center">
      <NuxtPage :appBarHeight="$display.navBar(display.height.value, 157)"
                :contacts="contacts"
                :frameMargin="marginTop"/>
    </v-main>
    <template v-if="!isIndex">
      <v-footer class="pa-0 mt-10"
                :style="`width: ${mobile ? display.width.value : $display.footer(display.width.value, $display.socialBar(display.width.value, 150))}px; margin-left: ${mobile ? 0 : $display.socialBar(display.width.value, 150)}px`">
        <client-only>
          <slide-group-component :isIndex="isIndex" :height="100"/>
        </client-only>
      </v-footer>
    </template>
    <template v-if="mobile">
      <v-footer class="d-block bg-primary px-8 py-10" style="min-height: 400px">
        <div class="d-flex align-self-baseline justify-space-between w-100">
          <v-img :max-width="$display.logo(display.width.value, 600)" src="/logo-w.svg"></v-img>
          <h4 class="font-size-36 font-weight-bold text-uppercase text-center mr-4 mr-lg-0">{{ $t('titles.menu') }}</h4>
        </div>
        <div class="d-flex align-self-baseline justify-space-between w-100 pt-10">
          <div class="d-flex flex-column align-baseline justify-start">
            <div v-if="contacts.sale_contact" class="d-flex flex-column flex-row-gap-5 mb-4"
                 style="line-height: normal">
              <span class="text-white text-uppercase font-size-18" style="letter-spacing: .00005rem">
                {{ contacts.sale_contact_title }}
              </span>
              <a class="on-hover text-white text-decoration-none font-weight-bold font-size-18"
                 :href="`tel:${contacts.sale_contact.replaceAll(' ', '')}`">
                {{ contacts.sale_contact }}
              </a>
            </div>
            <div v-if="contacts.service_contact" class="d-flex flex-column flex-row-gap-5 mb-4"
                 style="line-height: normal">
              <span class="text-white text-uppercase" style="letter-spacing: .00005rem">
                {{ contacts.service_contact_title }}
              </span>
              <a class="on-hover text-white text-decoration-none font-weight-bold font-size-18"
                 :href="`tel:${contacts.service_contact.replaceAll(' ', '')}`">
                {{ contacts.service_contact }}
              </a>
            </div>
            <div v-if="contacts.financial_contact" class="d-flex flex-column flex-row-gap-5 mb-4"
                 style="line-height: normal">
              <span class="text-white text-uppercase" style="letter-spacing: .00005rem">
                {{ contacts.financial_contact_title }}
              </span>
              <a class="on-hover text-white text-decoration-none font-weight-bold font-size-18"
                 :href="`tel:${contacts.financial_contact.replaceAll(' ', '')}`">
                {{ contacts.financial_contact }}
              </a>
            </div>
            <div v-if="contacts.email_contact" class="d-flex flex-column flex-row-gap-5 mb-4"
                 style="line-height: normal">
              <span class="text-white text-uppercase" style="letter-spacing: .00005rem">
                {{ contacts.email_contact_title }}
              </span>
              <template v-for="email of contactEmails">
                <a class="on-hover text-white text-decoration-none font-weight-bold font-size-18"
                   :href="`mailto:${email}`">{{ email }}</a>
              </template>
            </div>
            <div v-if="contacts.address_contact" class="d-flex flex-column flex-row-gap-5 mb-4"
                 style="line-height: normal">
              <span class="text-white text-uppercase" style="letter-spacing: .00005rem">
                {{ contacts.address_contact_title }}
              </span>
              <a class="on-hover text-white text-decoration-none font-weight-bold font-size-18" href=""
                 v-html="contacts.address_contact">
              </a>
            </div>
          </div>
          <div class="d-flex flex-column align-center justify-start flex-row-gap-20">
            <template v-for="item of menu">
              <NuxtLink :to="item.route"
                        class="d-flex align-center text-uppercase text-decoration-none font-weight-bold text-white on-hover">
                {{ item.title }}
              </NuxtLink>
            </template>
          </div>
        </div>
        <template v-if="orientation === 'landscape-primary' || orientation === 'landscape-secondary'">
          <div class="d-flex align-self-baseline justify-center w-100 pt-10">
            <h4 class="font-size-36 font-weight-bold text-uppercase text-center">{{ $t('titles.askQuestion') }}</h4>
          </div>
        </template>
        <template v-else>
          <div class="d-flex align-self-baseline justify-center w-100 pt-10">
            <h4 class="font-size-36 font-weight-bold text-uppercase text-center">{{ $t('titles.askQuestion') }}</h4>
          </div>
        </template>
        <template v-if="orientation === 'landscape-primary'">
          <div class="d-flex align-self-baseline justify-center w-100 pt-10">
            <v-form @submit.prevent="onSubmit" class="feedback-container">
              <div class="d-flex justify-space-between flex-column-gap-22 w-100 mb-5">
                <v-text-field :label="$t('form.name')" type="text" hide-details variant="outlined" density="compact"
                              :rules="[rules.required]"
                              v-model="feedback.name"
                              :rounded="0"
                              class="w-50"></v-text-field>
                <v-text-field :label="$t('form.company')" type="text" hide-details variant="outlined" density="compact"
                              :rules="[rules.required]"
                              v-model="feedback.company"
                              :rounded="0"
                              class="w-50"></v-text-field>
              </div>
              <div class="d-flex justify-space-between flex-column-gap-22 w-100 mb-5">
                <v-text-field :label="$t('form.phoneNumber')" type="text" hide-details variant="outlined"
                              density="compact"
                              :rules="[rules.required]"
                              v-model="feedback.phone"
                              :rounded="0"
                              class="w-50 border-opacity-100"></v-text-field>
                <v-text-field label="E-mail" type="email" hide-details variant="outlined" density="compact"
                              :rules="[rules.required, rules.email]"
                              v-model="feedback.email"
                              :rounded="0"
                              class="w-50"></v-text-field>
              </div>
              <div class="d-flex w-100 mb-5">
                <v-textarea :rules="[rules.required]" v-model="feedback.feedback" :label="$t('form.message')"
                            :rounded="0"
                            hide-details variant="outlined" class="w-100"></v-textarea>
              </div>
              <div class="d-flex justify-space-between flex-column-gap-22 w-100">
                <small class="text-secondary-light font-size-12">
                  <sup>*</sup> {{ message }}
                </small>
                <v-btn type="submit" variant="outlined" class="rounded-0">
                  {{ $t('form.submit') }}
                </v-btn>
              </div>
            </v-form>
          </div>
        </template>
        <template v-else>
          <div class="d-flex align-self-baseline justify-space-between w-100 pt-10">
            <v-form @submit.prevent="onSubmit" class="feedback-container">
              <div class="d-flex justify-space-between flex-column-gap-22 w-100 mb-5">
                <v-text-field :label="$t('form.name')" type="text" hide-details variant="outlined" density="compact"
                              :rules="[rules.required]"
                              v-model="feedback.name"
                              :rounded="0"
                              class="w-50"></v-text-field>
                <v-text-field :label="$t('form.company')" type="text" hide-details variant="outlined" density="compact"
                              :rules="[rules.required]"
                              v-model="feedback.company"
                              :rounded="0"
                              class="w-50"></v-text-field>
              </div>
              <div class="d-flex justify-space-between flex-column-gap-22 w-100 mb-5">
                <v-text-field :label="$t('form.phoneNumber')" type="text" hide-details variant="outlined"
                              density="compact"
                              :rules="[rules.required]"
                              v-model="feedback.phone"
                              :rounded="0"
                              class="w-50 border-opacity-100"></v-text-field>
                <v-text-field label="E-mail" type="email" hide-details variant="outlined" density="compact"
                              :rules="[rules.required, rules.email]"
                              v-model="feedback.email"
                              :rounded="0"
                              class="w-50"></v-text-field>
              </div>
              <div class="d-flex w-100 mb-5">
                <v-textarea :rules="[rules.required]" v-model="feedback.feedback" :label="$t('form.message')"
                            :rounded="0"
                            hide-details variant="outlined" class="w-100"></v-textarea>
              </div>
              <div class="d-flex justify-space-between flex-column-gap-22 w-100">
                <small class="text-secondary-light font-size-12">
                  <sup>*</sup> {{ message }}
                </small>
                <v-btn type="submit" variant="outlined" class="rounded-0">
                  {{ $t('form.submit') }}
                </v-btn>
              </div>
            </v-form>
          </div>
        </template>
        <v-divider class="w-100 my-5" style="border-width: 0.12px; opacity: 1" color="info"/>
        <div class="d-flex flex-column flex-row-gap-10">
          <small class="text-secondary-light font-size-12">
            © {{ new Date().getFullYear() }} <span v-html="$t('copyright')"></span>
          </small>
        </div>
      </v-footer>
    </template>
    <template v-else>
      <v-footer class="d-flex flex-column bg-primary py-15 px-0"
                :style="`width: ${$display.footer(display.width.value, $display.socialBar(display.width.value, 150))}px; margin-left: ${$display.socialBar(display.width.value, 150)}px`">
        <div class="footer-bar">
          <v-img :max-width="$display.logo(display.width.value, 200)" max-height="150" src="/logo-w.svg"></v-img>
          <h4 class="font-size-36 font-weight-bold text-uppercase text-center">{{ $t('titles.menu') }}</h4>
          <h4 class="font-size-36 font-weight-bold text-uppercase text-center">{{ $t('titles.askQuestion') }}</h4>
        </div>
        <div class="footer-info">
          <div class="contacts-container">
            <div v-if="!_.isEmpty(contacts.sale_contact)" class="d-flex flex-column flex-row-gap-2">
              <span class="text-accent text-uppercase font-size-16" style="letter-spacing: .00005rem">
                {{ contacts.sale_contact_title }}
              </span>
              <a class="on-hover text-white text-decoration-none font-weight-bold font-size-20"
                 :href="`tel:${contacts.sale_contact?.replaceAll(' ','')}`">
                {{ contacts.sale_contact }}
              </a>
            </div>
            <div v-if="!_.isEmpty(contacts.service_contact)" class="d-flex flex-column flex-row-gap-2">
              <span class="text-accent text-uppercase font-size-16" style="letter-spacing: .00005rem">
                {{ contacts.service_contact_title }}
              </span>
              <a class="on-hover text-white text-decoration-none font-weight-bold font-size-20"
                 :href="`tel:${contacts.service_contact?.replaceAll(' ','')}`">
                {{ contacts.service_contact }}
              </a>
            </div>
            <div v-if="!_.isEmpty(contacts.financial_contact)" class="d-flex flex-column flex-row-gap-2">
              <span class="text-accent text-uppercase font-size-16" style="letter-spacing: .00005rem">
                {{ contacts.financial_contact_title }}
              </span>
              <a class="on-hover text-white text-decoration-none font-weight-bold font-size-20"
                 :href="`tel:${contacts.financial_contact?.replaceAll(' ','')}`">
                {{ contacts.financial_contact }}
              </a>
            </div>
            <div v-if="!_.isEmpty(contacts.email_contact)" class="d-flex flex-column flex-row-gap-2">
              <span class="text-accent text-uppercase font-size-16" style="letter-spacing: .00005rem">
                {{ contacts.email_contact_title }}
              </span>
              <template v-for="email of contactEmails">
                <a class="on-hover text-white text-decoration-none font-weight-bold font-size-20"
                   :href="`mailto:${email}`">{{ email }}</a>
              </template>
            </div>
            <div v-if="!_.isEmpty(contacts.address_contact)" class="d-flex flex-column flex-row-gap-2">
              <span class="text-accent text-uppercase font-size-16" style="letter-spacing: .00005rem">
                {{ contacts.address_contact_title }}
              </span>
              <a class="on-hover text-white text-decoration-none font-weight-bold font-size-20" href=""
                 style="word-wrap: break-word"
                 v-html="contacts.address_contact">
              </a>
            </div>
          </div>
          <div class="menu-container">
            <template v-for="item of menu">
              <NuxtLink :to="item.route"
                        class="d-flex align-center text-uppercase text-decoration-none font-weight-bold text-white on-hover font-size-20">
                {{ item.title }}
              </NuxtLink>
            </template>
          </div>
          <v-form @submit.prevent="onSubmit" class="feedback-container">
            <div class="d-flex justify-space-between flex-column-gap-22 w-100">
              <v-text-field :label="$t('form.name')" type="text" hide-details variant="outlined" density="compact"
                            :rules="[rules.required]"
                            v-model="feedback.name"
                            :rounded="0"
                            class="w-50"></v-text-field>
              <v-text-field :label="$t('form.company')" type="text" hide-details variant="outlined" density="compact"
                            :rules="[rules.required]"
                            v-model="feedback.company"
                            :rounded="0"
                            class="w-50"></v-text-field>
            </div>
            <div class="d-flex justify-space-between flex-column-gap-22 w-100">
              <v-text-field :label="$t('form.phoneNumber')" type="text" hide-details variant="outlined"
                            density="compact"
                            :rules="[rules.required]"
                            v-model="feedback.phone"
                            :rounded="0"
                            class="w-50 border-opacity-100"></v-text-field>
              <v-text-field label="E-mail" type="email" hide-details variant="outlined" density="compact"
                            :rules="[rules.required, rules.email]"
                            v-model="feedback.email"
                            :rounded="0"
                            class="w-50"></v-text-field>
            </div>
            <div class="d-flex w-100">
              <v-textarea :rules="[rules.required]" v-model="feedback.feedback" :label="$t('form.message')" :rounded="0"
                          hide-details variant="outlined" class="w-100"></v-textarea>
            </div>
            <div class="d-flex justify-space-between flex-column-gap-22 w-100"
                 style="font-family: 'Arial', sans-serif">
              <small class="text-secondary-light font-size-14" style="line-height: 16px;">
                <sup>*</sup> {{ message }}
              </small>
              <v-btn type="submit" height="50" max-width="190" min-width="190"
                     style="font-family: 'Open Sans Condensed Bold', sans-serif"
                     variant="outlined" class="rounded-0 font-weight-bold font-size-18">
                {{ $t('form.submit') }}
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-footer>
      <client-only>
        <v-footer class="d-flex flex-column bg-primary py-15 flex-row-gap-15"
                  :style="`padding-left: calc((240 * 100%) / 1920); padding-right: calc((240 * 100%) / 1920);min-height: 200px; width: ${$display.footer(display.width.value, $display.socialBar(display.width.value, 150))}px; margin-left: ${$display.socialBar(display.width.value, 150)}px`">
          <v-divider class="w-100" style="border-width: 0.12px; opacity: 1" color="info"/>
          <div class="d-flex justify-space-between flex-column-gap-60" style="font-family: 'Arial', sans-serif">
            <small class="text-secondary-light font-size-11">
              © {{ new Date().getFullYear() }} <span v-html="$t('copyright')"></span>
            </small>
          </div>
        </v-footer>
      </client-only>
    </template>

  </v-layout>
  <search-dialog/>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useDisplay} from "vuetify";
import SvgIcon from '@jamescoyle/vue-icon'
import {useCommonStore} from "~/store/common";
import {useElementSize, useScreenOrientation} from "@vueuse/core";
import {mdiClose, mdiMagnify} from "@mdi/js";
import {useRoute} from "vue-router";
import Lt from "~/components/icons/lt.vue";
import Ru from "~/components/icons/ru.vue"
import Us from "~/components/icons/us.vue"
import BreadcrumbsComponent from "~/components/BreadcrumbsComponent.vue";
import Service from "~/models/Service";
import Publication from "~/models/Publication";
import Client from "~/models/Client";
import {useServicesStore} from "~/store/services";
import {usePublicationsStore} from "~/store/publications";
import {useClientsStore} from "~/store/clients";
import {useCarouselStore} from "~/store/carousel";
import Slide from "~/models/Slide";
import {useI18n} from "vue-i18n";
import {useLangStore} from "~/store/lang";
import Filter from "~/models/Filter";
import {useMenuColorStore} from "~/store/menuColor";
import _ from "lodash";

const drawer = ref(false)
const {find, create} = useStrapi()
const route = useRoute()
const {$display, $dateTime} = useNuxtApp()
const display = useDisplay()
const commonStore = useCommonStore()
const slogan = ref(null)
const langSeparator = ref(null)
const phoneSeparator = ref(null)
const sloganContainer = ref(null)
const phonesContainer = ref(null)
const networksContainer = ref(null)
const image = ref(null)
const {width} = useElementSize(slogan)
const {height} = useElementSize(networksContainer)
const phonesContainerSize = useElementSize(phonesContainer)
const breadcrumbsContainerSize = useElementSize(image)
const menuColor = useMenuColorStore()
const marginTop = ref(0)
const socialNetworks = computed(() => {
  return commonStore.getNetworks
})
const langStore = useLangStore()
const isIndex = computed(() => {
  return route.name === 'index' || route.name === 'Index' || route.name === 'INDEX'
})
const {locale, tm} = useI18n()

let message = computed(() => {
  return tm('form.notice')
})
let menu = computed(() => {
  return tm('menu')
})
const {orientation} = useScreenOrientation()
const {mobile} = useDisplay()
const mainPageCarousel = useCarouselStore()
const services = useServicesStore()
const publications = usePublicationsStore()
const clients = useClientsStore()
const isOpen = ref(false)
const filters = ref([])
const contacts = ref({})
const feedback = ref({
  name: null,
  company: null,
  phone: null,
  email: null,
  feedback: null,
})
const rules = ref({
  required: value => !!value || 'Поле обязательно к заполнению',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Поле должно быть валидным e-mail.'
  },
})
const setLocale = (lang) => {
  if (isOpen.value) {
    isOpen.value = !isOpen.value
  }
  locale.value = lang
  langStore.setLang(lang)
}
const onSubmit = async () => {
  await create('feedbacks', feedback.value)
      .then(() => {
        for (let key in feedback.value) {
          if (Object.hasOwn(feedback.value, key)) {
            feedback.value[key] = null
          }
        }
        message.value = tm('form.success')
        setTimeout(() => {
          message.value = tm('form.notice')
        }, 5000)
      })
}
await find('main-page', {
  populate:
      {
        filters: {fields: ['title', 'value']},
        carousels: {
          populate: ['src', 'mobile_src']
        },
        clients: {
          populate: 'logo'
        },
        publications: {
          populate: 'image'
        },
        services: {
          populate: ['logo', 'whiteLogo']
        },
      },
  locale: locale.value
})
    .then((response) => {
      mainPageCarousel.addItems(
          response.data.attributes.carousels.data.map((item) => {
            return new Slide(
                item.attributes.title,
                item.attributes.description,
                item.attributes.link,
                mobile.value ? item.attributes.mobile_src.data.attributes.url :
                    item.attributes.src.data.attributes.url,
                item.attributes.background,
                item.attributes.textColor,
            ).toJson()
          })
      )
      publications.addItems(response.data.attributes.publications.data.map((item) => {

        return new Publication(
            item.id,
            item.attributes.title,
            item.attributes.subtitle,
            item.attributes.article,
            item.attributes.image.data.attributes.url,
            item.attributes.slug,
            $dateTime.formatDate(item.attributes.createdAt, locale.value),
        ).toJson()
      }))
      clients.addItems(response.data.attributes.clients.data.map((item) => {
        return new Client(
            item.attributes.url,
            item.attributes.logo.data.attributes.url
        ).toJson()
      }))
      filters.value = response.data.attributes.filters.data.map((item) => {
        return new Filter(
            item.attributes.value,
            item.attributes.title
        ).toJson()
      })
      switch (true) {
        case display.width.value <= 768:
          services.addItems(response.data.attributes.services.data
              .map((item) => {
                return new Service(
                    item.id,
                    item.attributes.logo.data.attributes.url,
                    item.attributes.name,
                    item.attributes.slug,
                    item.attributes.description,
                    item.attributes.whiteLogo.data.attributes.url,
                ).toJson()
              })
          )
          break;
        case display.width.value > 768 && display.width.value <= 920:
          services.addItems(response.data.attributes.services.data.reduce((all, one, i) => {
                const ch = Math.floor(i / 2);
                all[ch] = [].concat((all[ch] || []), one);
                return all
              }, [])
                  .map((item) => {
                    return {
                      slides: item.map((item) => {

                        return new Service(
                            item.id,
                            item.attributes.logo.data.attributes.url,
                            item.attributes.name,
                            item.attributes.slug,
                            item.attributes.description,
                            item.attributes.whiteLogo.data.attributes.url,
                        ).toJson()
                      })
                    }
                  })
          )
          break
        default:
          services.addItems(response.data.attributes.services.data.reduce((all, one, i) => {
                const ch = Math.floor(i / 4);
                all[ch] = [].concat((all[ch] || []), one);
                return all
              }, [])
                  .map((item) => {
                    return {
                      slides: item.map((item) => {

                        return new Service(
                            item.id,
                            item.attributes.logo.data.attributes.url,
                            item.attributes.name,
                            item.attributes.slug,
                            item.attributes.description,
                            item.attributes.whiteLogo.data.attributes.url,
                        ).toJson()
                      })
                    }
                  })
          )
          break
      }
    })
    .then(async () => {
      await find('contacts', {locale: locale.value})
          .then(response => {
            contacts.value = response.data.attributes
          })
    })

watch(width, (value) => {
  if (value > 0) {
    networksContainer.value['style'].gridTemplateRows = `${value}px repeat(2, 1fr)`
    sloganContainer.value['style'].height = `${value}px`
  }
}, {immediate: true})

watch(height, (value) => {
  if (value > 0) {
    networksContainer.value['style'].marginTop = `calc((100vh - ${value}px) / 1.25)`
  }
}, {immediate: true})

watch(phonesContainerSize.height, (value) => {
  if (value > 0) {
    phoneSeparator.value['style'].height = `${(value * 70) / 100}px`
    langSeparator.value['style'].height = `${(value * 70) / 100}px`
  }
}, {immediate: true})

watch(breadcrumbsContainerSize.height, (value) => {
  if (value > 0) {
    if (commonStore.getComponent) {
      marginTop.value = value + 120
    } else {
      marginTop.value = 150
    }
  }
}, {immediate: true})

const contentPixels = ref(5)

watch(locale, async (value) => {
  await find('main-page', {
    populate:
        {
          filters: {
            fields: ['title', 'value']
          },
          carousels: {
            populate: ['src', 'mobile_src']
          },
          clients: {
            populate: 'logo'
          },
          publications: {
            populate: 'image'
          },
          services: {
            populate: ['logo', 'whiteLogo']
          },
        },
    locale: locale.value
  })
      .then((response) => {
        mainPageCarousel.addItems(
            response.data.attributes.carousels.data.map((item) => {
              return new Slide(
                  item.attributes.title,
                  item.attributes.description,
                  item.attributes.link,
                  mobile.value ? item.attributes.mobile_src.data.attributes.url : item.attributes.src.data.attributes.url,
                  item.attributes.background,
                  item.attributes.textColor,
                  item.attributes.button_color,
                  item.attributes.button_text_color,
              ).toJson()
            })
        )
        publications.addItems(response.data.attributes.publications.data.map((item) => {

          return new Publication(
              item.id,
              item.attributes.title,
              item.attributes.subtitle,
              item.attributes.article,
              item.attributes.image.data.attributes.url,
              item.attributes.slug,
              $dateTime.formatDate(item.attributes.createdAt, value),
          ).toJson()
        }))
        clients.addItems(response.data.attributes.clients.data.map((item) => {
          return new Client(
              item.attributes.url,
              item.attributes.logo.data.attributes.url
          ).toJson()
        }))
        filters.value = response.data.attributes.filters.data.map((item) => {
          return new Filter(
              item.attributes.value,
              item.attributes.title
          ).toJson()
        })
        if (mobile.value) {
          services.addItems(response.data.attributes.services.data
              .map((item) => {
                return new Service(
                    item.id,
                    item.attributes.logo.data.attributes.url,
                    item.attributes.name,
                    item.attributes.slug,
                    item.attributes.description,
                    item.attributes.whiteLogo.data.attributes.url,
                ).toJson()
              })
          )
        } else {
          services.addItems(response.data.attributes.services.data.reduce((all, one, i) => {
                const ch = Math.floor(i / 4);
                all[ch] = [].concat((all[ch] || []), one);
                return all
              }, [])
                  .map((item) => {
                    return {
                      slides: item.map((item) => {

                        return new Service(
                            item.id,
                            item.attributes.logo.data.attributes.url,
                            item.attributes.name,
                            item.attributes.slug,
                            item.attributes.description,
                            item.attributes.whiteLogo.data.attributes.url,
                        ).toJson()
                      })
                    }
                  })
          )
        }
      })
      .then(() => {
        find('contacts', {locale: locale.value})
            .then(response => {
              contacts.value = response.data.attributes
            })
      })
}, {immediate: true})
const openSearch = () => {
  commonStore.setSearch(true)
}
onMounted(() => {
  commonStore.setLoading(false)
  if (langStore.getLang !== locale.value) {
    setLocale(langStore.getLang)
  }
})
const menuTextColor = computed(() => {
  return menuColor.getColor
})
const contactEmails = computed(() => {
  return contacts.value.email_contact?.split(',') ?? []
})
</script>

<style lang="scss" scoped>
:deep(a) {
  &:not(.text-white, .more_info__button) {
    font-weight: bold;
    text-decoration: none;
    color: inherit;
  }
}

.on-hover {
  letter-spacing: 2px;
  transition: all .3s ease-in-out;
  color: var(--menu-text-color) !important;

  &.in_menu {
    color: #fff !important;
  }

  &:hover {
    color: #00EAFC !important;
  }

  &.menu {
    position: relative;
    transition: .3s ease-in-out;

    &:hover {
      &::before {
        position: absolute;
        bottom: -15px;
        left: 0;
        right: 0;
        margin: 0 auto;
        content: url("/chevron.svg");
        display: block;
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
