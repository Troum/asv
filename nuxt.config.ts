import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
    ssr: true,
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@100;300;400;500;600;700&display=swap'
                },
                {rel: 'icon', type: 'image/ico', sizes: '32x32', href: '/favicon.ico'}
            ],
            script: [
                {src: 'https://api-maps.yandex.ru/3.0/?apikey=0845768b-3f33-453f-970b-be8e7b249bd7&lang=ru_RU'}
            ],
            title: 'ASV Trade',
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0'
                }
            ]
        }
    },
    devtools: {enabled: true},
    css: [
        'vuetify/lib/styles/main.sass',
        '~/assets/styles/global.scss',
        '~/assets/styles/main.scss'
    ],
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        async (options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                config?.plugins?.push(vuetify());
            });
        },
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxt/image',
        '@nuxtjs/strapi',
        'nuxt-delay-hydration',
        ['@nuxt-modules/compression', {
            algorithm: 'brotliCompress'
        }],
        'nuxt-meilisearch'
    ],
    plugins: [
        '~/plugins/mitt.ts',
        '~/plugins/breadcrumbs.js',
        '~/plugins/display.js',
        '~/plugins/datetime.js',
        '~/plugins/i18n.ts',
    ],
    piniaPersistedstate: {
        storage: 'localStorage'
    },
    strapi: {
        url: 'https://dashboard.a-sv.site'
    },
    image: {
        quality: 80,
        strapi: {
            baseURL: 'https://dashboard.a-sv.site'
        }
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        }
    },
    devServer: {
        host: 'asv.test',
        port: 8000
    },
    delayHydration: {
        mode: 'mount'
    },
    meilisearch: {
        hostUrl: 'https://search.a-sv.site',
        searchApiKey: '43fa440fbf9eae9420b94d167c1454f60b0a005cba1d6463170d8c9993d24174',
        adminApiKey: '2ccz6NqdQcA4EXOOvV8cGi8sbnW9L6iJ',
        serverSideUsage: true,
        instantSearch: {
            theme: 'satellite'
        }
    }
})
