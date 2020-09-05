import Add from './components/Add.vue'
import Vue  from 'vue'
import Delete from './components/Delete.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Display from './components/Display.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const router = new VueRouter({
  mode : 'history',
  routes : [
    {
      path: '*',
      redirect:'/login',
    },
    {
      path: '/',
      redirect:'/login',
    },
    {
      path:'/login',
      name:'login',
    component:Login,

    },
    {
      path:'/add',
      name:'add',
      component:Add,
      meta:{
        requiresAuth:true
      },

    },

    {
      path:'/delete',
      name:'delete',
      component:Delete,
      meta:{
        requiresAuth:true
      },
    },
    {
      path:'/home',
      component:Home,
      name:'home',
      meta:{
        requiresAuth:true
      },
    },
    {
      path:'/display',
      component:Display,
      name:'display',
    },
  ]
})


router.beforeEach((to,from,next)=>{
  let requiresAuth = to.matched.some(record=>record.meta.requiresAuth);
  let currentUser = firebase.auth().currentUser;

  if(requiresAuth){
    if(currentUser){
      next()
      var name = currentUser.email
      var sname = name.slice('@')

    }
    else{
      next('login')
    }
  }
    else{
      next()
    }

})
router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
