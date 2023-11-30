<script setup>
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiClose} from "@mdi/js";
const rules = ref({
  required: value => !!value || 'Поле обязательно к заполнению',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Поле должно быть валидным e-mail.'
  },
})

const props = defineProps({
  status: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['closeDialog'])
const feedback = ref({
  name: null,
  company: null,
  phone: null,
  email: null,
  feedback: null,
})
const {create} = useStrapi()
const {tm} = useI18n()

let message = ref(tm('form.notice'))

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
</script>

<template>
<v-dialog :persistent="true" max-width="98%" :model-value="status">
  <v-form @submit.prevent="onSubmit" class="feedback-container">
  <v-card color="primary" class="pa-10 px-5 position-relative">
    <v-btn @click="emits('closeDialog')" :ripple="false" variant="plain"
           style="top: 2.5%"
           class="position-absolute" location="top right">
      <svg-icon size="36" type="mdi" :path="mdiClose" style="color: #fff;"></svg-icon>
    </v-btn>
    <v-card-title class="mb-6">
      <h4 class="font-size-36 font-weight-bold text-uppercase text-center">{{ $t('titles.askQuestion') }}</h4>
    </v-card-title>
    <v-card-text>
      <div class="d-flex justify-space-between flex-column-gap-24 w-100 mb-6">
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
      <div class="d-flex justify-space-between flex-column-gap-24 w-100 mb-6">
        <v-text-field :label="$t('form.phoneNumber')" type="text" hide-details variant="outlined" density="compact"
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
      <div class="d-flex w-100 mb-6">
        <v-textarea :rules="[rules.required]" v-model="feedback.feedback" :label="$t('form.message')" :rounded="0"
                    hide-details variant="outlined" class="w-100"></v-textarea>
      </div>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between flex-column flex-row-gap-22 w-100 px-4">
      <v-btn height="42" type="submit" variant="outlined" class="rounded-0 font-size-16">
        {{ $t('form.submit') }}
      </v-btn>
      <small class="text-secondary-light font-size-10">
        <sup>*</sup> {{ message }}
      </small>
    </v-card-actions>
  </v-card>
  </v-form>
</v-dialog>
</template>

<style scoped lang="scss">
</style>