var
  path = require('path')

  // webpack plugin
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')
;

var
  IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
  , IS_PRODUCTION = process.env.NODE_ENV === 'production'
  , cssIdentifier = IS_PRODUCTION ? '[hash:base64:10]' : '[path][name]__[local]'
;

var
  styleLoaderConfig = {
    styleLoader: {
      loader: 'style-loader'
    },
    cssLoader: {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        modules: true,
        localIdentName: cssIdentifier
      },
    },
    cssLoaderNoModules: {
      loader: 'css-loader',
      options: {
        importLoaders: 2
      },
    },
    postLoader: {
      loader: 'postcss-loader',
      options: {
        config: {
          path: path.resolve('postcss.customConfig.js'),
        },
      },
    },
    sassLoader: {
      loader: 'sass-loader',
      options: {
        outputStyle: 'expanded',
      },
    },
  };


var config = {
  entry: path.resolve('src', 'index.js'),

  output: {
    path: IS_DEVELOPMENT
      ? path.resolve('dist')
      : path.resolve('build'),
    filename: IS_PRODUCTION
      ? 'AwesomeSwiper.min.js'
      : 'AwesomeSwiper.js',
    library: 'AwesomeSwiper',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('node_modules')
    ],
    'extensions': ['.js']
  },

  module: {
    rules: [
      // Scripts
      {
        test: /\.js$/,
        include: [
          path.resolve('src'),
          path.resolve('node_modules', 'swiper'),
        ],
        loader: 'babel-loader'
      },

      // style
      {
        test: /\.scss$/,
        exclude: [
          path.resolve('node_modules'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            styleLoaderConfig.cssLoader,
            styleLoaderConfig.postLoader,
            styleLoaderConfig.sassLoader,
          ],
        })
      },
      {
        test: /\.css$/,
        include: [
          path.resolve('node_modules', 'swiper'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            styleLoaderConfig.cssLoaderNoModules
          ],
        })
      },

      // Pug template
      {
        test: /\.pug$/,
        include: [
          path.resolve('src'),
          path.resolve('static')
        ],
        exclude: [
          path.resolve('node_modules')
        ],
        loader: 'pug-loader'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: IS_PRODUCTION
        ? 'AwesomeSwiper.min.css'
        : 'AwesomeSwiper.css',
      ignoreOrder: true,
      allChunks: true
    }),
  ]
};

// dev mode
if (IS_DEVELOPMENT) {
  // devtool
  config.devtool = 'source-map';

  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('./static', 'view', 'index.pug'),
    }),

    new CleanWebpackPlugin(['dist'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false
    }),

    new BrowserSyncPlugin({
      server: {
        baseDir: 'dist',
      },
    }, {
      reload: true,
    })
  );
}

// production mode
if (IS_PRODUCTION) {
  config.plugins.push(
    new CleanWebpackPlugin(['build'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false
    }),

    new OptimizeCssAssetsPlugin(),

    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: false,
        ecma: 5,
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        },
        warnings: false,
        sourceMap: true
      }
    })
  );
}

module.exports = config;
