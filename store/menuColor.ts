import { defineStore } from 'pinia'
export const useMenuColorStore = defineStore({
    id: 'menu-color-store',
    persist: true,
    state: () => {
        return {
            color: '#FFF'
        }
    },
    actions: {
        setColor(value: string) {
            this.color = value
        }
    },
    getters: {
        getColor: state => state.color,
    }
})
