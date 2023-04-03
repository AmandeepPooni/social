import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import CommentList from '../components/CommentList.vue'
import UserPage from '../pages/UserPage.vue'
import Description from '../pages/Description.vue'

const routes = [
  { path: '/', name: "home", component: Home, children:[
    { path: '/', component: Description },
    { path: '/comments', component: CommentList },
    { path: '/users', component: UserPage }
  ] },
  { path: '/login', name: 'login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router