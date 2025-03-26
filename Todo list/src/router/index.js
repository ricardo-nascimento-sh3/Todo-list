import { createRouter, createWebHistory } from 'vue-router'
import TodosView from '../views/TodosView.vue'
import CompletedView from '../views/CompletedView.vue'

const routes = [
  { path: '/todos', component: TodosView },
  { path: '/completed', component: CompletedView },
  { path: '/', redirect: '/todos' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
