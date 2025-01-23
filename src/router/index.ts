import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

interface RouteMeta {
  title?: string;
  metaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    metaTags?: Array<{
      name?: string;
      property?: string;
      content: string;
    }>;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Markdown To Go - Online Markdown Editor & Converter',
      metaTags: [
        {
          name: 'description',
          content: 'Free online Markdown editor with live preview. Convert Markdown to formatted text, customize fonts, and export to PDF. No sign-up required.'
        },
        {
          property: 'og:description',
          content: 'Free online Markdown editor with live preview. Convert Markdown to formatted text, customize fonts, and export to PDF. No sign-up required.'
        }
      ]
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'About Markdown To Go - Features & Usage Guide',
      metaTags: [
        {
          name: 'description',
          content: 'Learn about Markdown To Go features, usage guide, and how to make the most of our free online Markdown editor and converter.'
        },
        {
          property: 'og:description',
          content: 'Learn about Markdown To Go features, usage guide, and how to make the most of our free online Markdown editor and converter.'
        }
      ]
    }
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyView.vue'),
    meta: {
      title: 'Privacy Policy - Markdown To Go',
      metaTags: [
        {
          name: 'description',
          content: 'Read our privacy policy to understand how Markdown To Go handles your data and protects your privacy while using our online Markdown editor.'
        }
      ]
    }
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/TermsView.vue'),
    meta: {
      title: 'Terms of Service - Markdown To Go',
      metaTags: [
        {
          name: 'description',
          content: 'Review our terms of service to understand the conditions for using Markdown To Go, our free online Markdown editor and converter.'
        }
      ]
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// SEO and Meta Tag Management
router.beforeEach((to, from, next) => {
  // Find the nearest route with a title
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta?.title)

  // Find the nearest route with meta tags
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta?.metaTags)

  // Clean up existing meta tags
  Array.from(document.getElementsByTagName('meta')).forEach(tag => {
    if (tag.getAttribute('data-vue-router-controlled')) {
      tag.parentNode?.removeChild(tag)
    }
  })

  // Update document title
  if (nearestWithTitle?.meta?.title) {
    document.title = nearestWithTitle.meta.title as string
  }

  // Add new meta tags
  if (nearestWithMeta?.meta?.metaTags) {
    (nearestWithMeta.meta.metaTags as Array<Record<string, string>>).forEach(tagDef => {
      const tag = document.createElement('meta')
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key])
      })
      tag.setAttribute('data-vue-router-controlled', '')
      document.head.appendChild(tag)
    })
  }

  next()
})

export default router
