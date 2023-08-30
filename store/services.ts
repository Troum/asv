import { defineStore } from 'pinia'

export const useServicesStore = defineStore({
    id: 'services-store',
    state: () => {
        return {
            serviceId: 0,
            items: [],
        }
    },
    persist: true,
    actions: {
        addItems(value: any) {
            this.items = value
        }
    },
    getters: {
        list: (state) => state.items
    }
})
