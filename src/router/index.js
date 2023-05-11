import { createRouter, createWebHistory } from 'vue-router'
import TablePage from '../pages/Table.vue'
import LoginPage from '../pages/Login.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: { name: 'login' }
		},
		{
			path: '/table',
			name: 'table',
			component: TablePage
		},
		{
			path: '/login',
			name: 'login',
			component: LoginPage
		}
	]
})

export default router
