网站前端展示页面

基于 Vue-cli 3.0 构建

安装使用的模块：
 
    axios v0.18.0
    vue-router v3.0.1
    js-md5 v0.7.3   // 用于加密注册及登录时发送的用户密码
 
webpack打包配置项的修改：
    
1、 修改 /config/index.js 的build配置：
    解决项目打包后放到后台非根目录(public)下访问出错的问题

    index: path.resolve(__dirname, '../notes/index.html'),
    assetsRoot: path.resolve(__dirname, '../notes'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/notes/',    
        
2、 修改 /build/utils.js 的cssLoaders：
    解决项目打包以后css文件无法正确加载的问题
    
        if (options.extract) {
              return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader',
                // 增加下面这行
                publicPath:'../../'
              })
            } else {
              return ['vue-style-loader'].concat(loaders)
            }

3、 修改 /config/webpack/prod/conf.js 的 HtmlWebpackPlugin配置：
    解决项目打包后无法在浏览器标签页上显示小图标的问题
    
        new HtmlWebpackPlugin({
              filename: config.build.index,
              template: 'index.html',
              inject: true,
              // 增加下面这行
              favicon: path.resolve('favicon.ico'),
        .....
