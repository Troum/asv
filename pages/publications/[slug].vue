<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="mx-0 position-relative page-frames" :style="`margin-top: ${frameMargin}px`">
      <v-card flat class="px-0" style="padding-top: 60px; padding-bottom: 60px">
        <v-card-title class="d-flex justify-end">
          <v-btn style="opacity: 1;" variant="plain"
                 :ripple="false"
                 class="d-flex align-center font-size-18 font-weight-bold">
            <svg-icon size="26" type="mdi" :path="mdiChevronLeft"/>
            <NuxtLink to="/publications" class="ml-4 text-decoration-none text-primary">Назад</NuxtLink>
          </v-btn>
        </v-card-title>
        <v-card-title tag="h1" class="text-uppercase font-size-36 px-0">Заголовок новости H1</v-card-title>
        <v-card-subtitle tag="h4" class="text-uppercase font-size-18 px-0" style="color: #333">
          подзаголовок новости h4 / 30.04.2023 - 19:30
        </v-card-subtitle>
        <v-card-text class="px-0">
          <nuxt-img class="my-10" src="/poster.png"></nuxt-img>
          <article v-html="publication"></article>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<script setup>
import {ref} from "vue"
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiChevronLeft} from "@mdi/js";
const {$event} = useNuxtApp()

defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})

$event('set:title', 'Заголовок новости H1')

const publication = ref('<p><strong>Title: *** Miraculous World of Ophthalmology: ********* Vision and Transforming Lives</strong></p>\n' +
    '<p><strong>Introduction:</strong></p>\n' +
    '<p><br>****** is a ******** gift **** allows ** to experience and navigate the world around us. ** is through *** eyes that we perceive colors, shapes, and the beauty of life. However, not everyone is fortunate enough to **** perfect eyesight. This ** where the ***** of ophthalmology comes into play, transforming lives through the diagnosis, treatment, and prevention of eye conditions. In this blog post, we will explore the fascinating ***** of ophthalmology and shed light on the ************ that have revolutionized eye care.</p>\n' +
    '<p><strong>Diagnosing Vision Problems:</strong></p>\n' +
    '<p><br>Ophthalmologists are *********** ******* professionals who diagnose and treat various eye conditions. *** first step in **** process is a comprehensive eye examination. Using state-of-the-art equipment and techniques, ophthalmologists assess the visual acuity, check *** refractive errors, examine the health of the eye structures, and evaluate ********** such as glaucoma, cataracts, macular degeneration, *** ******** retinopathy. This comprehensive evaluation enables them to identify the root cause of vision problems accurately and devise appropriate ********* plans.</p>\n' +
    '<p><strong>Revolutionary Technologies:</strong></p>\n' +
    '<p><br>*** field of ophthalmology has witnessed significant advancements in recent years, thanks to cutting-edge technologies that have *********** the way eye conditions are diagnosed and treated. One such breakthrough is the use of optical ********* ********** (OCT), a non-invasive imaging ********* that provides detailed cross-sectional images of the eye&apos;s structures. This technology has greatly ******** the early detection of ******* ******** *** glaucoma, allowing for timely intervention *** improved outcomes.</p>\n' +
    '<p>Another remarkable advancement is the development of laser-******** eye surgeries. ********** like LASIK (Laser-Assisted In Situ Keratomileusis) have revolutionized vision correction, ******** individuals **** refractive errors such as nearsightedness, farsightedness, and astigmatism to achieve clearer vision. These procedures are performed with precision and ******* discomfort, resulting in quick recovery and reduced dependency on ********** eyewear.</p>\n' +
    '<p><strong>Treating Age-Related Eye Conditions:</strong></p>\n' +
    '<p><br>** ** age, our eyes become more susceptible to ******* conditions that can affect our vision. Cataracts, for example, *** a common age-******* condition that causes clouding of the eye&apos;s natural lens. However, cataract surgery has undergone ********** advancements, allowing *** micro-********** techniques and *** implantation of artificial intraocular lenses, restoring clear vision and improving the quality of life for millions ** people.</p>\n' +
    '<p>Age-related macular degeneration (AMD) ** another condition that affects the ******* part of the retina, leading to ******* or distorted vision. With the advent of ************ injections and innovative drugs, ophthalmologists can now slow down the progression of AMD, preserving vision for longer durations and improving patients&apos; overall quality ** life.</p>\n' +
    '<p>Prevention *** Public Eye Health:<br>Ophthalmology ** not ****** focused on treating existing eye conditions; it also emphasizes the importance of prevention and public eye health. Regular eye examinations, especially for individuals with a ****** ******* of eye diseases, play a crucial role in early detection and prevention. Additionally, education campaigns and awareness programs help promote eye health, emphasizing the significance of proper eye care, UV protection, and ********* choices that positively impact vision.</p>\n' +
    '<p><strong>Conclusion:</strong></p>\n' +
    '<p><br>Ophthalmology is an awe-inspiring field that has ************** the way we perceive and treat eye conditions. Through advancements in technology, diagnosis, *** treatment, ophthalmologists have transformed the lives of countless individuals, restoring vision and enhancing overall quality of life. As we continue to explore new horizons in ophthalmology, ** can look forward ** brighter futures where eye conditions are increasingly preventable, and the gift of sight is cherished and protected.</p>\n' +
    '<p><br></p>\n' +
    '<div style="color: red;">Created with <a href="https://wordtohtml.net/">WordToHTML.net</a> trial.</div>')

</script>

<style lang="scss" scoped>

</style>
