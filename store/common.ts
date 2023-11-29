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
                    href: 'https://www.youtube.com/@ASVGroupBaltic'
                }
            ],
            component: null,
            title: null,
            serviceFilter: null,
            loading: true,
            search: false
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
        },
        setSearch(value: boolean) {
            this.search = value
        }
    },
    getters: {
        getNetworks: state => state.networks,
        getComponent: state => state.component,
        getTitle: state => state.title,
        getServiceFilter: state => state.serviceFilter,
        getLoading: state => state.loading,
        getLang: state => state.lang,
        getSearch: state => state.search,
    }
})
