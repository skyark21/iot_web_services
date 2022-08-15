
export default {
  ssr: false,
  head: {
    title: 'IoT Web Services',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css'}
    ],
    bodyAttrs: {
      class: ''
    }
  },
  router: {
    linkExactActiveClass: 'active'
  },
  loading: { color: '#fff' },
  css: [
    'assets/css/demo.css',
    'assets/css/nucleo-icons.css',
    'assets/sass/black-dashboard.scss'
  ],
  plugins: [
    `~/plugins/dashboard-plugin.js`
  ],
  components: [
    {
      path: '~/components',
      extensions: ['vue'],
    },
    {
      path: '~/components/Widgets',
      extensions: ['vue'],
    }
  ],
  buildModules: [],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    'nuxt-highcharts'
  ],
  axios: {
    baseURL:'http://127.0.0.1:3001/api'
  },
  build: {
    postcss: null,
    transpile: [/^element-ui/],
    extend (config, ctx) {
    },
    babel: {
      plugins: [
        [
          'component',
          {
            'libraryName': 'element-ui',
            'styleLibraryName': 'theme-chalk'
          }
        ]
      ]
    }
  }
}