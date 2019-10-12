const
  path = require('path')
  , webpack = require('webpack')
  , packageJson = require('./package.json')

  // webpack plugin
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
  , {CleanWebpackPlugin} = require('clean-webpack-plugin')
  , CopyWebpackPlugin = require('copy-webpack-plugin')
  , DefinePlugin = require('webpack/lib/DefinePlugin')
;

const
  libName = 'AwesomeSwiper'
  , IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
  , IS_PACK = process.env.NODE_ENV === 'pack'
  , IS_PRODUCTION = process.env.NODE_ENV === 'production'
  , IS_STANDALONE = process.env.NODE_ENV === 'standalone'
  , cssIdentifier = IS_DEVELOPMENT ? '[path][name]__[local]' : '[hash:base64:10]'
;

const styleLoaderConfig = {
  styleLoader: {
    loader: 'style-loader'
  },
  cssLoader: {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      modules: {
        localIdentName: cssIdentifier,
      },
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
        path: path.resolve('postcss.config.js'),
      },
    },
  },
  sassLoader: {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        outputStyle: 'expanded',
      },
    },
  },
};


const UGLIFY_OPTIONS = {
  uglifyOptions: {
    ie8: false,
    safari10: true,
    ecma: 5,
    output: {
      comments: /^!/,
      beautify: false
    },
    compress: {
      drop_debugger: true,
      drop_console: true,
      collapse_vars: true,
      reduce_vars: true
    },
    warnings: false,
    sourceMap: true
  }
};


const config = {
  mode: 'none',
  entry: [
    'swiper',
    path.resolve('src', 'index.js')
  ],

  output: {
    library: libName,
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('static'),
      path.resolve('node_modules')
    ],
    'alias': {
      'swiper': path.resolve('node_modules', 'swiper', 'js', 'swiper.js')
    },
    'extensions': ['.js']
  },

  module: {
    rules: [
      // Scripts
      {
        test: /\.js$/,
        type: 'javascript/auto',
        loader: 'babel-loader',
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
    new DefinePlugin({
      DEVELOPMENT: JSON.stringify(IS_DEVELOPMENT),
      PACK: JSON.stringify(IS_PACK),
      PRODUCTION: JSON.stringify(IS_PRODUCTION),
      STANDALONE: JSON.stringify(IS_STANDALONE),
    }),

    new webpack.BannerPlugin({
      banner: packageJson.name + ' v' + packageJson.version +
        '\nHomepage: ' + packageJson.homepage +
        '\nReleased under the ' + packageJson.license + ' License.'
    })
  ]
};

// dev mode
if (IS_DEVELOPMENT) {
  config.mode = 'development';

  // devtool
  config.devtool = 'source-map';

  config.output.path = path.resolve('dist');
  config.output.filename = libName + '.js';


  config.plugins.push(
    new ExtractTextPlugin({
      filename: libName + '.css',
      ignoreOrder: true,
      allChunks: true
    }),

    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('./static', 'view', 'index.pug'),
    }),

    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),

    new CopyWebpackPlugin([{
      from: path.resolve('static', 'images', '*'),
      to: path.resolve('dist'),
      flatten: true
    }]),

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
if (IS_PACK || IS_PRODUCTION) {
  config.output.path = path.resolve('build');

  config.externals = {
    swiper: 'Swiper'
  };

  if (IS_PACK) {
    config.output.filename = libName + '.js';

    config.plugins.push(
      new ExtractTextPlugin({
        filename: libName + '.css',
        ignoreOrder: true,
        allChunks: true
      }),

      new CleanWebpackPlugin({
        verbose: true,
        dry: false
      }),
    );
  }

  if (IS_PRODUCTION) {
    config.mode = 'production';

    config.output.filename = libName + '.min.js';

    config.plugins.push(
      new webpack.HashedModuleIdsPlugin(),

      new ExtractTextPlugin({
        filename: libName + '.min.css',
        ignoreOrder: true,
        allChunks: true
      }),

      new OptimizeCssAssetsPlugin()
    );

    config.optimization = {
      minimizer: [
        // Uglify Js
        new UglifyJsPlugin(UGLIFY_OPTIONS),
      ]
    };
  }
}

// standalone mode
if (IS_STANDALONE) {
  config.mode = 'production';

  config.output.path = path.resolve('standalone');
  config.output.filename = libName + '.standalone.min.js';

  config.plugins.push(
    new webpack.HashedModuleIdsPlugin(),

    new ExtractTextPlugin({
      filename: libName + '.standalone.min.css',
      ignoreOrder: true,
      allChunks: true
    }),

    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),

    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('./static', 'view', 'index.pug'),
    }),

    new CopyWebpackPlugin([{
      from: path.resolve('static', 'images', '*'),
      to: path.resolve('standalone'),
      flatten: true
    }]),

    new OptimizeCssAssetsPlugin()
  );

  config.optimization = {
    minimizer: [
      // Uglify Js
      new UglifyJsPlugin(UGLIFY_OPTIONS),
    ]
  };
}

module.exports = config;
