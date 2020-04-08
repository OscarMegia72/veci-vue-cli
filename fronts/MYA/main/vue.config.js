module.exports = {
    lintOnSave: false,
    css: {
      extract: false
    },
    configureWebpack: {
        resolve: {
          alias: {
            vue$: 'vue/dist/vue.esm.js'
          },
          extensions: ['*', '.js', '.vue', '.json']
        },
      },
    devServer: {
        overlay:{
          warnings:true,
          errors:false
        },
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        open: process.platform === 'darwin',
        host: 'localhost',
        port: 8085,
        https: false,
        hotOnly: false
      },
      publicPath: 'http://localhost:8085/',
      outputDir: `/dist/`

}