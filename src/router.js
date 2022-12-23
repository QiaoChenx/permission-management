import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/Users.vue'
import Roles from '@/components/role/Roles.vue'
import GoodsCate from '@/components/goods/GoodsCate.vue'
import GoodsList from '@/components/goods/GoodsList.vue'
import NotFound from '@/components/NotFound.vue'
import store from './store'

Vue.use(Router)

const userRule = { path: '/users', component: Users };
const roleRule = { path: '/roles', component: Roles };
const goodsRule = { path: '/goods', component: GoodsList };
const categoriesRule = { path: '/categories', component: GoodsCate };

const ruleMapping = {
  'users': userRule,
  'roles': roleRule,
  'goods': goodsRule,
  'categories': categoriesRule
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        // { path: '/users', component: Users },
        // { path: '/roles', component: Roles },
        // { path: '/goods', component: GoodsList },
        // { path: '/categories', component: GoodsCate }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

export function initDynamicRoutes() {
  const currentRoutes = router.options.routes;
  const rightList = store.state.rightList;
  rightList.forEach(item => {
    item.children.forEach(item1 => {
      const temp = ruleMapping[item1.path];
      temp.meta = item1.rights;
      currentRoutes[2].children.push(temp);
    })
  })
  router.addRoutes(currentRoutes);  
}

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    const token = sessionStorage.getItem('token');
    if (!token) {
      next('/login');
    } else {
      next();
    }
  }
})

export default router
