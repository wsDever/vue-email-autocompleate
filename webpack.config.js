const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

/**
 * 环境变量
 * @type {String}
 */
const ENV = process.env.NODE_ENV;
const setPath = url => path.resolve(__dirname, url);

let config = {
  /**
   * 入口文件设置
   * @type {Object}
   */

    entry:() => {
      return ENV == 'development' 
      ? {
        index: './src/index.js'
      }:{
        index: './src/index.js',
        main: './src/components/email-autocompleate/index.js'
      }
    },
  /**
   * loader 规则
   * @type {Object}
  */
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        include: [setPath('src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.less$/,
        include: [setPath('src')],
        use: [
          {
            loader:'style-loader'
          },{
            loader:'css-loader'
          },{
            loader:'less-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: setPath('src'),
        loader: 'url-loader',
        options: {
          limit: 1000000,
          name: '[name].[hash:5].[ext]'
        }
      }
    ]
  },

  /**
   * 插件列表
   * @type {Array}
   */
  plugins: [
    // vue loader 必用
    new VueLoaderPlugin(),

    // 全局环境变量定义
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(ENV)
    }),

    new ExtractCssChunks({
      filename: 'css/[name].[hash:5].css',
      chunkFilename: 'css/[name].[id].[hash:5].css',
      hot: true,
      orderWarning: true,
      reloadAll: true,
      cssModules: false
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // common: {
        //   name: 'common',
        //   chunks: 'all',
        //   minChunks: 2
        // }
      }
    }
  }
};

/**
 * 开发环境配置
 */
if (ENV === 'development') {
  config.mode = ENV;
  config.devtool = 'source-map';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './app.html',
      filename: './app.html',
      inject: 'body'
    })
  )
  config.devServer = {
    clientLogLevel: 'warning',
    hot: true,
    host: '0.0.0.0',
    port: '5454',
    stats: {
      assets: true,
      performance: true,
      timings: true,
      builtAt: false,
      children: false,
      chunks: false,
      hash: false,
      entrypoints: false,
      modules: false,
      cached: false,
      cachedAssets: false
    }
  };
}

/**
 * 发布配置 和 测试
 */
if (ENV !== 'development') {
  config.output = {
    filename: '[name].js',
    path: setPath('dist'),
    publicPath: './',
    library: 'emailAutocomplate',
    libraryTarget: 'umd', // 指定输出格式
    umdNamedDefine: true 
  };
  config.plugins.push(
    new CompressionPlugin({
      cache: true,
      threshold: 10240
    })
  );
  config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  config.optimization.minimizer = [
    // 优化 js
    new UglifyJsPlugin({
      exclude: /\.min\.js$/,
      cache: true,
      sourceMap: false,
      parallel: true,
      extractComments: false,
      uglifyOptions: {
        compress: {
          unused: true,
          warnings: true,
          drop_console: true
        },
        output: {
          comments: false
        }
      }
    })
  ];
}

module.exports = config;
