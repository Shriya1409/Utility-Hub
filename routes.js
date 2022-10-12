const routes = [
  {
    path: '/',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('components/Login.vue'),
        meta: {
          checkRedirect: true
        }
      },
      {
        path: '/login',
        name:'login',
        component: () => import('components/Login.vue')
      }
    ]
  },
  {
    path: '/theHub',
    component: () => import('layouts/AppLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'landingPage',
        component: () => import('components/LandingPage.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/nucleus',
        name: 'viewCommunicationDashboard',
        meta: {
          requiresAuth: true
        },
        component: () => import('src/nucleus/ViewCommunicationDashboard.vue')
      },
      {
        path: '/graphs',
        name: 'main',
        component: () => import('src/graphs/main.vue')
      },
      {
        path: '/dsplayDetails',
        name: 'displayDetails',
        component: () => import('src/nucleus/displayDetails.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  })
}

export default routes
