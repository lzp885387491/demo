const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://8.131.89.181:7001/',// 线上 服务端域名地址
        target: "http://192.168.0.127:7001",// 魏浩爽 服务端域名地址
        // target: "http://192.168.0.122:7001",// 尚宇豪 服务端域名地址
        // target: "http://192.168.0.112:7001",// 磊哥 服务端域名地址
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/api": '' }
      }
    }
  }
})
