import {
    createRouter,
    createWebHistory
} from 'vue-router'


const routes = [
    {
        path: '/',
        component: () => import('../views/AssociationRule.vue'),
        name: 'AssociationRule'
    },
    {
        path: '/classification',
        component: () => import('../views/Classification.vue'),
        name: 'Classification'
    },
    {
        path: '/clustering',
        component: () => import('../views/Clustering.vue'),
        name: 'Clustering'
    },
    {
        path: '/regression',
        component: () => import('../views/Regression.vue'),
        name: 'Regression'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
