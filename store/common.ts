import { defineStore } from 'pinia'
import {mdiFacebook, mdiInstagram, mdiYoutube} from "@mdi/js";

export const useCommonStore = defineStore({
    id: 'common-store',
    state: () => {
        return {
            lang: 'lt',
            networks: [
                {
                    icon: mdiFacebook,
                    href: 'https://facebook.com'
                },
                {
                    icon: mdiInstagram,
                    href: 'https://instagram.com'
                },
                {
                    icon: mdiYoutube,
                    href: 'https://youtube.com'
                }
            ],
            component: null,
            title: null,
            serviceFilter: null,
            loading: true
        }
    },
    actions: {
        setComponent(component: any) {
            this.component = component
        },
        setTitle(title: any) {
            this.title = title
        },
        setServiceFilter(value: any) {
            this.serviceFilter = value
        },
        setLoading(value: any) {
            this.loading = value
        },
        setLang(value: string) {
            this.lang = value
        }
    },
    getters: {
        getNetworks: state => state.networks,
        getComponent: state => state.component,
        getTitle: state => state.title,
        getServiceFilter: state => state.serviceFilter,
        getLoading: state => state.loading,
        getLang: state => state.lang,
    }
})
