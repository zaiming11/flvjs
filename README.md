vue

此vue项目flv.js下载到本地src/assets中引用的 

import "../assets/flvjs/flv.min.js";

 npm安装方法
 
 安装flvjs 
 
npm install --save flv.js

 在build文件夹中的webpack.base.conf.js 

var webpack = require('webpack');

resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'flvjs':'flv.js/dist/flv.js'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      flvjs:'flvjs'
    })
  ],

   全局引用 
   
  import flvjs from 'flvjs';
  Vue.use(flvjs);

 单页面引用 

import flvjs from "flv.js/dist/flv.js";
