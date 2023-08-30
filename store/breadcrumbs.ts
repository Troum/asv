import { defineStore } from 'pinia'
import _ from "lodash"
import { useRoute } from "vue-router";

const route = useRoute()

export const useBreadcrumbsStore = defineStore({
    id: 'breadcrumbs-store',
    persist: true,
    state: () => {
        return {
            breadcrumbs: [],
        }
    },
    actions: {
        addBreadcrumbToBreadcrumbs(value: any) {
            this.breadcrumbs = value
        },
        removeFromBreadcrumbs(value: any) {
            if (!_.isNull(value)) {
                // @ts-ignore
                _.remove(this.breadcrumbs, {label: value})
            }
        }
    },
    getters: {
        list: (state) => state.breadcrumbs,
    }
})
