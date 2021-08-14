const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}


module.exports={
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('./src'))
        .set('cpnts',resolve('./src/components'))
        .set('views',resolve('./src/views'))
        .set('css',resolve('./src/css'))
        .set('js',resolve('./src/js'))
        .set('assets',resolve('./src/assets'))
        .set('config',resolve('./src/config'))
    }
}
