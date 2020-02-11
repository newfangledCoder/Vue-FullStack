import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Meetings from "../views/Meetings.vue";

// setting the dependency
Vue.use(VueRouter);

const routes = [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/meetings",
      name: "meetings",
      component: Meetings
    },
    {
      path: "*",
      redirect: "/"
    }
  ];
  
  const router = new VueRouter({
    routes
  });
  
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/login')
    } else {
      next()
    }
  });

  export default router;