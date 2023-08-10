import { defineStore } from 'pinia'
import {mdiFacebook, mdiInstagram, mdiYoutube} from "@mdi/js";

interface ServiceFilter {
    value: string;
    title: string;
}
export const useCommonStore = defineStore({
    id: 'common-store',
    state: () => {
        return {
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
            serviceFilter: {}
        }
    },
    actions: {
        setComponent(component: any) {
            this.component = component
        },
        setTitle(title: any) {
            this.title = title
        },
        setServiceFilter(value: ServiceFilter) {
            this.serviceFilter = value
        }
    },
    getters: {
        getNetworks: state => state.networks,
        getComponent: state => state.component,
        getTitle: state => state.title,
        getServiceFilter: state => state.serviceFilter,
    }
})
