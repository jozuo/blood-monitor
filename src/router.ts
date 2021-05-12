import InspectionItemPage from '@/containers/pages/InspectionItemPage.vue';
import MeasureRecordDetailPage from '@/containers/pages/MeasureRecordDetailPage.vue';
import MeasureRecordPage from '@/containers/pages/MeasureRecordPage.vue';
import TestPage from '@/containers/pages/TestPage.vue';
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/inspection-item',
      name: 'inspection-item',
      component: InspectionItemPage,
    },
    {
      path: '/measure-record',
      name: 'measure-record',
      component: MeasureRecordPage,
    },
    {
      path: '/measure-record-detail',
      name: 'measure-record-detail',
      component: MeasureRecordDetailPage,
    },
    {
      path: '/test',
      name: 'test',
      component: TestPage,
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
