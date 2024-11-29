import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EditView from '../views/EditView.vue';
import TestView from '../views/TestView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:id/edit',
      name: 'edit',
      component: EditView,
    },
    {
      path: '/testview',
      name: 'testview',
      component: TestView,
    }

  ],
});

export default router;
