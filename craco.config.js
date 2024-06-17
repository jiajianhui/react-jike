// 扩展webpack的配置

const path = require('path')

module.exports = {
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 使用 @ 表示 src 文件所在路径
            '@': path.resolve(__dirname, 'src')
        }
    }
}