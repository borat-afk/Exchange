import Vue from 'vue'
import Router from 'vue-router'

import ExchangeList from '../components/ExchangeList'
import Receipt from '../components/Receipt'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'exchange',
            component: ExchangeList
        },
        {
            path: '/receipt',
            name: 'receipt',
            component: Receipt
        }
    ]
})

export default router;