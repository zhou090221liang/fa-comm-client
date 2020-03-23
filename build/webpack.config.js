var path = require('path');  //加载nodejs的路径处理模块
module.exports = {
    entry: path.join(__dirname, '../src/'),
    output: {
        path: path.join(__dirname, '../dist/'),        //__dirname是一个nodejs变量，表示当前js文件所在的目录
        filename: 'comm.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '../src/'),    //配置文件目录下的es6文件夹作为js源代码文件夹，所有源代码一定要放在该文件夹下
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};