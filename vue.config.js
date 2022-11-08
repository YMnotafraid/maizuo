const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 暂时关闭代码校验
  // 反向代理
  devServer: {
    proxy: {
      '/ajax': {
        target: 'https://www.maoyan.com',
        changeOrigin: true
      }
    }
  }
})
