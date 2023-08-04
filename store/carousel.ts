import { defineStore } from 'pinia'

export const useCarouselStore = defineStore({
    id: 'carousel-store',
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
