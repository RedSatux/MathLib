import Vuex from 'vuex'
import types from './store/types'
import createStore from './store'
import {sync} from 'vuex-router-sync'

import Layout from './Layout'

export default (
    {
        Vue,
        options,
        router
    }
) => {
    Vue.use(Vuex);

    const store = createStore();
    sync(store, router);

    router.addRoutes([
        {
            path: '/posts/', component: Layout
        },
        {
            path: '/tags/:tag?', component: Layout
        },
        {
            path: '/category/:category?', component: Layout
        },
    ]);

    router.beforeResolve((to, from, next) => {
        if (to.name) {
            store.commit(types.LOAD_START)
        }
        next()
    });

    router.afterEach(() => {
        store.commit(types.LOAD_END)
    });

    options.store = store
}
