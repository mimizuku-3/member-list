import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import AppTop from '@/views/AppTop.vue';

const routeSettings: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'AppTop',
    component: AppTop,
  },
  {
    path: "/member/memberList",
    name: "MemberList",
    component: () => import('@/views/member/MemberList.vue'),
  },
  {
    path: "/member/detail/:id",
    name: "MemberDetail",
    component: () => import('@/views/member/MemberDetail.vue'),
    props: (route) => {
      const idNum = Number(route.params.id);
      return { id: idNum };
    }
  },
  {
    path: "/member/add",
    name: "MemberAdd",
    component: () => import('@/views/member/MemberAdd.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeSettings,
});

export default router;
