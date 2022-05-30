import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/taskDetailsView',
        name: 'taskDetailsView',
        component: () => import('../views/task/taskDetailsView.vue')
      },
      {
        path: '/userListView',
        name: 'userListView',
        component: () => import('../views/task/userListView.vue')
      },
      {
        path: '/htmlQuestion',
        name: 'htmlQuestion',
        component: () => import('../views/task/htmlQuestion.vue')
      }, {
        path: '/jsQuestion',
        name: 'jsQuestion',
        component: () => import('../views/task/jsQuestion.vue')
      }, {
        path: '/cssQuestion',
        name: 'cssQuestion',
        component: () => import('../views/task/cssQustion.vue')
      }, {
        path: '/questionView',
        name: 'questionView',
        component: () => import('../views/task/questionView.vue')
      }, {
        path: '/modifyPersonalInformation',
        name: 'modifyPersonalInformation',
        component: () => import('../views/task/modifyPersonalInformation.vue')
      }, {
        path: '/myTaskView',
        name: 'myTaskView',
        component: () => import('../views/task/myTaskView.vue')
      }, {
        path: '/createTaskView',
        name: 'createTaskView',
        component: () => import('../views/task/createTaskView.vue')
      }, {
        path: '/taskListView',
        name: 'taskListView',
        component: () => import('../views/task/taskListView.vue')
      }, {
        path: '/roleManagementView',
        name: 'roleManagement',
        component: () => import('../views/task/roleManagementView.vue'),
        redirect: '/jurisdictionView',
        children: [
          {
            path: '/ownerView',
            name: 'ownerView',
            component: () => import('../views/task/ownerView.vue'),
            // redirect: '/jurisdictionView',
            children: [
              {
                path: '/roleMembersView',
                name: 'roleMembersView',
                component: () => import('../views/task/roleMembersView.vue'),
              },
              {
                path: '/jurisdictionView',
                name: 'jurisdictionView',
                component: () => import('../views/task/jurisdictionView.vue'),
              },
              {
                path: '/rangeView',
                name: 'rangeView',
                component: () => import('../views/task/rangeView.vue'),
              },
            ]
          }
        ]
      }
      , {
        path: '/createRoleView',
        name: 'createRole',
        component: () => import('../views/task/createRoleView.vue')
      }
    ]
  },
  {
    path: '/registerIdView',
    name: 'register',
    component: () => import('../views/registerIdView.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginIdView.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
