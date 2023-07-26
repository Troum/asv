import {createVuetify} from 'vuetify';
import 'vuetify/styles';
import {asv} from "assets/themes/asv";

const asvTheme = asv
export default defineNuxtPlugin((nuxtApp) => {

    const vuetify = createVuetify({
        ssr: true,
        theme: {
            defaultTheme: 'asvTheme',
            themes: {
                asvTheme,
            },
        }
    });

    nuxtApp.vueApp.use(vuetify);
});
