require('dotenv').config()

export default {
  target: 'static',
  head: {
    title: 'Laur',
    htmlAttrs: {
        lang: 'en'
    },
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
            hid: 'description',
            name: 'description',
            content: 'description'
        }
    ],
    link: [
        { hid: 'favicon', rel: 'icon', type: 'image/x-icon', href: '/assets-outside/favicon.svg' }
    ],
    script: []
  },
  plugins: [
    { src: '~/plugins/apiAirtable' },
    { src: '~/plugins/apiNetlify' }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    ['@nuxtjs/style-resources', {
      scss: [
          '~/assets/styles/variables.scss',
          '~/assets/styles/global.scss',
          '~/assets/styles/mixins.scss'
      ]
    }]
  ],
  buildModules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontawesome'
  ], 
  axios: {
    baseURL: process.env.MAIN_API
  },
  googleFonts: {
    families: {
      'Signika Negative': [400]
    },
    display: 'swap',
    download: true,
    overwriting: true
  },
  fontawesome: {
    component: 'Fa',
    suffix: false,
    icons: {
      solid: true,
      brands: true,
    },
  },
  build: {
    loaders: {
      scss: { sourceMap: false }
    }
  }
}
