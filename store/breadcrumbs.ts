import { defineStore } from 'pinia'
import _ from "lodash"
import { useRoute } from "vue-router";

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
                _.remove(this.breadcrumbs, {_path: useRoute().path})
            }
        }
    },
    getters: {
        list: (state) => state.breadcrumbs,
    }
})
