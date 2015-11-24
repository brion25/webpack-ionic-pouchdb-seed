var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry:'./app/app.js',
  output:{
    path:path.join(__dirname,'./www/dist'),
    filename:'bundle.js'
  },
  module:{
    loaders:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel?presets[]=es2015"
      },
      {
        test:/\.scss$/,
        loader : ExtractTextPlugin.extract('style-loader','css-loader!sass-loader')
      },
      {
        test:/\.jade$/,
        loader:"jade"
      }
    ]
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin({minimize:true}),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('bundle.css')
  ]
}
