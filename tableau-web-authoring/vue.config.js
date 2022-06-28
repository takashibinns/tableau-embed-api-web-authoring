const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],
  runtimeCompiler: true,
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // Allow Tableau Embedding API's web components
          isCustomElement: tag => tag==='tableau-viz' || tag==='tableau-authoring-viz'
        }
      }))
  }
})
