export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // server: {
  //   host: '0.0.0.0', // default: localhost
  //   port: 8001,
  // },
  target: 'static',
  head: {
    titleTemplate: '%s - frontend',
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://use.typekit.net/vls5puz.css" },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Orbitron&display=swap" }
    ],
    script: [
        {
            type: 'text/javascript',
            src: 'js/Jquery.js',
            body: true
        },
        // {
        //     type: 'text/javascript',
        //     src: 'js/gsap/minified/gsap.min.js',
        //     body: true
        // },
        // {
        //     type: 'text/javascript',
        //     src: 'js/gsap/minified/Draggable.min.js',
        //     body: true
        // },
    ]
  },

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/gsap", ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // 'nuxt-gsap-module',
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    ['nuxt-mail', {
      message: {
        to: 'talk2us@mwek.co.uk',
      },
      smtp: {
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: 'phil.longhurst@onqor.co.uk',
          pass: 'gppddnykogzcdbya'
        },
      },
    }],
  ],
  // or use the top-level option:
  mail: {
    message: {
      to: 'foo@bar.de',
    },
    smtp: {
      host: "smtp.example.com",
      port: 587,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  // vuetify: {
  //   // customVariables: ['~/assets/variables.scss'],
  //   theme: {
  //     dark: true,
  //     themes: {
  //       dark: {
  //         primary: colors.blue.darken2,
  //         accent: colors.grey.darken3,
  //         secondary: colors.amber.darken3,
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3
  //       }
  //     }
  //   }
  // },
  // // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['gsap'],
    // standalone: true
  }
}


