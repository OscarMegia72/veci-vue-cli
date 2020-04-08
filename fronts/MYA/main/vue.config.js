module.exports = {
    configureWebpack: {

        resolve: {
          alias: {
            vue$: 'vue/dist/vue.esm.js'
          },
          extensions: ['*', '.js', '.vue', '.json']
        },
      },
    devServer: {
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        // proxy: 'http://localhost:2001',
        open: process.platform === 'darwin',
        host: 'localhost',
        port: 8085,
        https: false,
        hotOnly: false
      },
      publicPath: 'http://localhost:8086/',
      outputDir: `/dist/`

}