const
  path = require('path')
  , webpack = require('webpack')
  , packageJson = require('./package.json')

  // webpack plugin
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , DefinePlugin = require('webpack/lib/DefinePlugin')
  , TerserPlugin = require('terser-webpack-plugin')
  , {CleanWebpackPlugin} = require('clean-webpack-plugin')

  // config
  , terserConfig = require('@cycjimmy/config-lib/terserWebpackPlugin/2.x/production')
;

const
  libName = packageJson.name.replace(/^.+\//g, '')
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

const OPTIMIZATION_OPTIONS = {
  minimize: true,
  minimizer: [new TerserPlugin(terserConfig)],
};


const config = {
  mode: 'none',
  entry: [
    'swiper',
    path.resolve('src', 'index.js')
  ],

  output: {
    library: 'AwesomeSwiper',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('static'),
      path.resolve('node_modules')
    ],
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
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          styleLoaderConfig.cssLoaderNoModules
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          styleLoaderConfig.cssLoader,
          styleLoaderConfig.postLoader,
          styleLoaderConfig.sassLoader,
        ],
      },

      // Pug template
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },

      // Pictures
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ]
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),

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
    }),
  ],
};

// dev mode
if (IS_DEVELOPMENT) {
  config.mode = 'development';

  // devtool
  config.devtool = 'source-map';

  config.output.path = path.resolve('dist');
  config.output.filename = libName + '.js';

  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('./static', 'view', 'index.pug'),
    }),

    new CleanWebpackPlugin({
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
if (IS_PACK || IS_PRODUCTION) {
  config.output.path = path.resolve('build');

  config.externals = {
    swiper: 'Swiper'
  };

  if (IS_PACK) {
    config.output.filename = libName + '.js';

    config.plugins.push(
      new CleanWebpackPlugin({
        verbose: true,
        dry: false
      }),
    );
  }

  if (IS_PRODUCTION) {
    config.mode = 'production';

    config.output.filename = libName + '.min.js';

    config.optimization = OPTIMIZATION_OPTIONS;
  }
}

// standalone mode
if (IS_STANDALONE) {
  config.mode = 'production';

  config.output.path = path.resolve('standalone');
  config.output.filename = libName + '.standalone.min.js';

  config.plugins.push(
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),

    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('./static', 'view', 'index.pug'),
    }),
  );

  config.optimization = OPTIMIZATION_OPTIONS;
}

module.exports = config;
