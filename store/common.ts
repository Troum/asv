import { defineStore } from 'pinia'
import {mdiFacebook, mdiInstagram, mdiYoutube} from "@mdi/js";

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
        }
    },
    actions: {
        setComponent(component: any) {
            this.component = component
        },
        setTitle(title: any) {
            this.title = title
        }
    },
    getters: {
        getNetworks: state => state.networks,
        getComponent: state => state.component,
        getTitle: state => state.title,
    }
})
