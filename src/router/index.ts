import { createRouter, createWebHistory } from 'vue-router';
import Doctors from '../pages/Doctors/Index.vue';
import Nurses from '../pages/Nurses/Index.vue';

const routes = [
  { path: '/doctors', name: 'Doctors', component: Doctors },
  { path: '/nurses', name: 'Nurses', component: Nurses },
  { path: '/', redirect: '/doctors' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
