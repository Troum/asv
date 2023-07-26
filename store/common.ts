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
            ]
        }
    },
    getters: {
        getNetworks: state => state.networks,
    }
})
