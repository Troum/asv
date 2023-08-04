import { defineStore } from 'pinia'

export const useProductsStore = defineStore({
    id: 'products-store',
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
