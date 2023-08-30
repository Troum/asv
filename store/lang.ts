import { defineStore } from 'pinia'
export const useLangStore = defineStore({
    id: 'lang-store',
    persist: true,
    state: () => {
        return {
            lang: 'lt'
        }
    },
    actions: {
        setLang(value: string) {
            this.lang = value
        }
    },
    getters: {
        getLang: state => state.lang,
    }
})
