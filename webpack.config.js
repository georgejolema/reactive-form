const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const cleanOptions = {
  root: __dirname,
  verbose: true,
  dry: false,
  exclude: [],
 };

 let pathsToClean = [
  'dist'
]

module.exports = {
 context: __dirname,
 target: 'web',
 entry: {
    polyfills: "./public/polyfills",
    vendors: "./public/vendors",        
    bundle: "./public/main",
},
 resolve: {
   extensions: ['.ts', '.js', '.json', '.css', '.scss'],
 },
 mode: 'development',

 module: {
   rules: [{
       test: /\.ts$/,
       loader: '@ngtools/webpack',
       exclude: [/\.(spec|e2e)\.ts$/, /node_modules/],
     },
     {
       test: /\.ts$/,
       loader: 'null-loader',
       include: [/\.(spec|e2e)\.ts$/],
     },
     {
       test: /\.json$/,
       use: 'json-loader'
     },
     {
       test: /\.(eot|woff|woff2|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
       loader: 'file-loader',
       options: {
         context: 'assets',
         name: '[path][name].[ext]'
       },
     },
     { 
        test: /\.(html|css)$/, 
        use: 'raw-loader' ,
        exclude: [/\.async\.(html)$/, /node_modules/]
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'raw-loader'
        },
        {
          loader: 'sass-loader' // compiles Sass to CSS
        }
      ],
      exclude: [/node_modules/, /styles/]
    },
    {
      test: /\.(scss)$/,
      use: [
        {
          loader: 'style-loader', // inject CSS to page
        }, 
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, 
        {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, 
        {
          loader: 'sass-loader' // compiles Sass to CSS
        }],
      include: [/node_modules/, /styles/]
    },
    {
        test: /\.async\.(html|scss)$/, 
        loaders: ['file?name=[name].[hash].[ext]', 'extract']
    },
   ]
 },
 optimization: {
   splitChunks: {
     cacheGroups: {
       commons: {
         test: /[\\/]node_modules[\\/]/,
         name: "vendors",
         chunks: "all"
       }
     }
   }
 },
 plugins: [
  new OptimizeCSSAssetsPlugin({}),
  new CleanWebpackPlugin(pathsToClean, cleanOptions),
   new MiniCssExtractPlugin({
     filename: '[name].[hash].css',
   }),
   new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        chunks: ['polyfills', 'vendors',  'bundle'],
        chunksSortMode: 'manual'
    }),
   new webpack.IgnorePlugin(/vertx/),
   new AngularCompilerPlugin({
     platform: 0,
     entryModule: path.join(__dirname, 'public/app/app.module#AppModule'),
     sourceMap: true,
     tsConfigPath: path.join(__dirname, 'tsconfig.json'),
     skipCodeGeneration: true,
   })
 ]
};