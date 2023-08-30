import { defineStore } from 'pinia'
import _ from "lodash"

export const useBreadcrumbsStore = defineStore({
    id: 'breadcrumbs-store',
    state: () => {
        return {
            breadcrumbs: [],
        }
    },
    persist: true,
    actions: {
        addBreadcrumbToBreadcrumbs(value: any) {
            this.breadcrumbs = value
        },
        removeFromBreadcrumbs(value: any) {
            if (!_.isNull(value)) {
                // @ts-ignore
                _.remove(this.breadcrumbs, {label: value?.title})
            }
        }
    },
    getters: {
        list: (state) => state.breadcrumbs,
    }
})
