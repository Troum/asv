<template>
  <v-container :fluid="true" class="ma-0 pa-0">
    <v-col cols="12" class="mx-0 position-relative page-frames" :style="`margin-top: ${frameMargin}px`">
      <div class="product-card" :style="`grid-template-columns: ${$display.width(display.width.value, 540)}px 1fr`">
        <nuxt-img src="/product.png"></nuxt-img>
        <v-card :rounded="0" :elevation="0">
          <v-card-subtitle class="font-size-18 font-weight-light px-0">Alcon</v-card-subtitle>
          <v-card-title class="font-size-24 font-weight-bold px-0">CONSTELLATION® Vision System</v-card-title>
          <v-card-text class="font-size-18 font-weight-regular px-0">
            Современная система для витректомии CONSTELLATION® Vision System объединяет функции для скоростного реза,
            контроля внутриглазного давления, освещения, лазерного излучения и других возможностей для удобства хирурга
            во время работы.
            <br/>
            <br/>
            <b>Играйте по новым правилам.</b>
            <br/>
            <br/>
            Constellation Vision System устанавливает новый стандарт контроля над хирургией. Сочетание высокоскоростных
            витреотомов Ultravit с контролируемым хирургом рабочим циклом, контролем ВГД, улучшенным ксеноновым
            освещение и компонентами эффективности V-LOCITY обеспечивает исключительный уровень производительности.
          </v-card-text>
          <v-card-actions class="px-0">
            <v-btn :rounded="0" width="160" height="50" class="bg-primary text-white">Запрос</v-btn>
          </v-card-actions>
          <v-card-actions class="px-0 d-flex justify-end">
            <v-btn @click="router.back()" style="opacity: 1; width: fit-content; height: fit-content" class="d-flex" variant="plain"
                   :rounded="0" :ripple="false">
              <svg-icon size="28" class="text-primary" type="mdi" :path="mdiChevronLeft"/>
              <span class="font-weight-bold">Назад</span>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-tabs
            style="grid-column: 1 / -1; border-top: 1px solid #c4c4c4"
            selected-class="font-weight-medium"
            :ripple="false"
            :hide-slider="true"
            bg-color="transparent"
        >
          <v-tab @click="tab = 'description'" class="font-weight-light" variant="plain" :rounded="0" :ripple="false"
                 style="opacity: 1; border-right: 1px solid #c4c4c4">
            Описание
          </v-tab>
          <v-tab @click="tab = 'characteristics'" class="font-weight-light" variant="plain" :rounded="0" :ripple="false"
                 style="opacity: 1">
            Характеристики
          </v-tab>
          <v-tab @click="tab = 'video'" class="font-weight-light" variant="plain" :rounded="0" :ripple="false"
                 style="opacity: 1; border-left: 1px solid #c4c4c4">
            видео
          </v-tab>
        </v-tabs>
        <v-window v-model="tab" style="grid-column: 1 / -1">
          <v-window-item
              v-for="(item, index) of tabs"
              :key="index"
              :value="item.value"
          >
            <v-card :flat="true">
              <v-card-text v-html="item.html"></v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </div>
    </v-col>
  </v-container>
</template>

<script setup>
import {ref} from "vue";
import {useDisplay} from "vuetify";
import {mdiChevronLeft} from "@mdi/js";
import {useRouter} from "vue-router";
import SvgIcon from "@jamescoyle/vue-icon";
defineProps({
  frameMargin: {
    type: Number,
    default: 0
  }
})
const router = useRouter()
const {$event, $display} = useNuxtApp()
const display = useDisplay()
const tab = ref('')
const tabs = ref([
  {
    value: 'description',
    html: '<h4 class="text-uppercase mb-2"><strong>Высокоэффективные витреотомы Ultravit</strong></h4>\n' +
        '<p>Высокоскоростные витреотомы Ultravit&reg; 5000 рез/мин, с рабочим циклом, контролируемым самим хирургом, снижают вероятность ятрогенных разрывов и послеоперационных осложнений:</p>\n' +
        '<ul>\n' +
        '<li>Позволяют хирургу работать максимально близко к сетчатке без тракции;</li>\n' +
        '<li>Двойной пневматический привод обеспечивает до 5000 рез/мин и более;</li>\n' +
        '<li>Повышенная универсальность позволяет витреотому быть мультифункциональным инструментом;</li>\n' +
        '<li>Доступные размеры &ndash; 20, 23 и 25+ Ga.</li>\n' +
        '</ul>\n' +
        '<h4 class="text-uppercase mb-2"><br /><strong>Контролируемый хирургом рабочий цикл</strong></h4>\n' +
        '<p>Высокоскоростной, настраиваемый по желанию хирурга рабочий цикл является уникальной чертой Constellation Vision System, позволяющей ощутить разнообразие и контроль функций одновременно. Контролируя поток, независимо от вакуума и частоты резов, хирург может сделать больше:</p>\n' +
        '<ul>\n' +
        '<li>Гарантировать точность и уверенность в самых сложных процедурах;</li>\n' +
        '<li>Повысить частоту резов и контроль аспирации;</li>\n' +
        '<li>Выбрать оптимальный режим рабочего цикла: &laquo;ядро&raquo; (порт преимущественно открыт), 50/50 и &laquo;бритье&raquo; (порт преимущественно закрыт).</li>\n' +
        '</ul>\n' +
        '<h4 class="text-uppercase mb-2"><br /><strong>Стабильный контроль ВГД</strong></h4>\n' +
        '<p>Обладая настройкой контроля инфузии в реальном времени, Constellation Vision System позволяет контролировать и стабилизировать ВГД: 2</p>\n' +
        '<ul>\n' +
        '<li>Неинвазивный датчик потока является запатентованной технологией компании Alcon;</li>\n' +
        '<li>Компенсирует и обеспечивает контроль инфузионного давления;</li>\n' +
        '<li>Дает возможность поддерживать стабильность глаза на непревзойденном уровне.</li>\n' +
        '</ul>\n' +
        '<h4 class="text-uppercase mb-2"><br /><strong>Система Витреоретинальной хирургии микроразрезов (MIVS) от Alcon</strong></h4>\n' +
        '<p>Система Витреоретинальной хирургии микроразрезов (MIVS), включающая полную коллекцию хирургического инструментария, обеспечивает несравненное разнообразие, стабильность и контроль, чтобы с легкостью справиться с любым требованием витреоретинальной хирургии.</p>\n' +
        '<ul>\n' +
        '<li>Инструментарий для микроразрезов обеспечивает лучший доступ внутрь глаза при осложненных ситуациях;</li>\n' +
        '<li>Инструмены меньших размеров требуют меньших разрезов и являются менее травматичными для глаза;</li>\n' +
        '<li>Позволяют быстрее восстановить зрительные функции на фоне лучшего комфорта пациента;</li>\n' +
        '<li>Клапанные канюли обеспечивают закрытие системы для истинного контроля ВГД в любых ситуациях.</li>\n' +
        '</ul>\n' +
        '<h4 class="text-uppercase mb-2"><br /><strong>Торсионная рукоятка Ozil</strong></h4>\n' +
        '<p>Только торсионная рукоятка Ozil создает запатентованные осцилляционные ультразвуковые движения из стороны в сторону. Данная технология, не имеющая эффекта отталкивания, является новым стандартом эффективности удаления катаракты:</p>\n' +
        '<ul>\n' +
        '<li>Облегчает окклюзию и эффективную доставку энергии к фрагментам ядра;</li>\n' +
        '<li>Снижает дисперсию фрагментов ядра;</li>\n' +
        '<li>Обеспечивает улучшенный профиль термической безопасности;</li>\n' +
        '<li>Создает основу для эффективной микрокоаксиальной хирургии катаракты.</li>\n' +
        '</ul>\n' +
        '<h4 class="text-uppercase mb-2"><br /><strong>Компоненты эффективности V-LOCITY</strong></h4>\n' +
        '<p>Настройка параметров хирургии Constellation Vision System является простой и четкой процедурой:</p>\n' +
        '<ul>\n' +
        '<li>ENGAUGE RFID автоматически распознает любое устройство, присоединяемое к прибору;</li>\n' +
        '<li>Цветовая кодировка и система чип-коннекторов исключает любые ошибки;</li>\n' +
        '<li>Сканер штрих-кодов гарантирует точность отчетов;</li>\n' +
        '<li>Первичная настройка системы одним нажатием кнопки ускоряет подготовку системы к использованию;</li>\n' +
        '<li>Видео-помощь дает возможность пользователю подготовить систему быстрее и без ошибок.</li>\n' +
        '</ul>'
  },
  {
    value: 'characteristics',
    html: '<h4 class="text-uppercase mb-2"><br /><strong>Компоненты эффективности V-LOCITY</strong></h4>\n' +
        '<p>Настройка параметров хирургии Constellation Vision System является простой и четкой процедурой:</p>\n' +
        '<ul>\n' +
        '<li>ENGAUGE RFID автоматически распознает любое устройство, присоединяемое к прибору;</li>\n' +
        '<li>Цветовая кодировка и система чип-коннекторов исключает любые ошибки;</li>\n' +
        '<li>Сканер штрих-кодов гарантирует точность отчетов;</li>\n' +
        '<li>Первичная настройка системы одним нажатием кнопки ускоряет подготовку системы к использованию;</li>\n' +
        '<li>Видео-помощь дает возможность пользователю подготовить систему быстрее и без ошибок.</li>\n' +
        '</ul>'
  },
  {
    value: 'video',
    html: '<h4 class="text-uppercase mb-2"><br /><strong>Стабильный контроль ВГД</strong></h4>\n' +
        '<p>Обладая настройкой контроля инфузии в реальном времени, Constellation Vision System позволяет контролировать и стабилизировать ВГД: 2</p>\n' +
        '<ul>\n' +
        '<li>Неинвазивный датчик потока является запатентованной технологией компании Alcon;</li>\n' +
        '<li>Компенсирует и обеспечивает контроль инфузионного давления;</li>\n' +
        '<li>Дает возможность поддерживать стабильность глаза на непревзойденном уровне.</li>\n' +
        '</ul>\n'
  }
])
$event('set:title', 'CONSTELLATION® Vision System')


</script>

<style lang="scss" scoped>
.product-card {
  display: grid;
  grid-auto-rows: max-content;
  grid-column-gap: 30px;
}
</style>
