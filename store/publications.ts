import { defineStore } from 'pinia'

export const usePublicationsStore = defineStore({
    id: 'publications-store',
    state: () => {
        return {
            items: [],
        }
    },
    persist: true,
    actions: {
        addItems(value: any) {
            this.items = value
        },
    },
    getters: {
        list: (state) => state.items,
    }
})
