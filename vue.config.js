module.exports = {
    devServer: {
        before: require('./mock/index.js'), // 引入mock/index.js
        open: true
    },
    lintOnSave: false
}