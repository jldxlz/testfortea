const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  devServer: {
    host: 'localhost',
    port: 8080,  //没被占用，可以使用的端口
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.taskon.xyz/v1', //接口域名, 要改这个才能请求过去
        changeOrigin: true,             //是否跨域
        secure: false,                   //是否https接口
        pathRewrite: {                  //路径重置
          '^/api': ''
        }
      },
      '/istackAgent': {
        target: 'http://localhost:1578', //接口域名, 要改这个才能请求过去
        changeOrigin: true,             //是否跨域
        secure: false,                   //是否https接口
        pathRewrite: {                  //路径重置
          '^/istackAgent': ''
        }
      }
    }
  }
})


// const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)
// 　css: {
//   // 是否使用css分离插件 ExtractTextPlugin
//   extract: IS_PROD,
//   // 开启 CSS source maps?
//   sourceMap;false,
//   // css预设器配置项
//   loaderOptions;{
//   }
//   // 启用 CSS modules for all css / pre-processor files.
//   modules: false
// }
