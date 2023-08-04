import { defineStore } from 'pinia'

export const useClientsStore = defineStore({
    id: 'clients-store',
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
