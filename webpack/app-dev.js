import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const appConfig = (params) => {
  const { mode, rootDir, publicDir, version, entry, output, hmrPath, css } = params
  const webpackHMRPath = `/__webpack_hmr_${hmrPath}`
  return {
    mode,
    entry: {
      app: [
        `webpack-hot-middleware/client?path=${webpackHMRPath}&timeout=20000`,
        path.resolve(rootDir, 'app', entry),
        path.resolve(rootDir, 'app', 'styles', css || 'main.scss')
      ]
    },
    output: {
      publicPath: `/${version}/`,
      path: publicDir,
      filename: path.join('js', output)
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  'env',
                  'stage-0',
                  'react',
                  'react-hmre'
                ]
              }
            }
          ]
        },
        // Generate CSS to be bundled with webapp
        {
          test: /\.scss$/,
          include: [
            path.resolve(rootDir, 'node_modules'),
            path.resolve(rootDir, 'app', 'styles')
          ],
          use: ['style-loader',
            'css-loader',
            'sass-loader',
            {
              loader: 'regexp-replace-loader',
              options: {
                match: {
                  pattern: '{% version %}',
                  flags: 'g'
                },
                replaceWith: `${version}`
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new CopyWebpackPlugin([
        {
          from: path.resolve(rootDir, 'static', 'images'),
          to: path.resolve(publicDir, 'images')
        }
      ]),
      new webpack.DefinePlugin({
        hmrPath: webpackHMRPath
      })
    ],
    performance: {
      hints: false
    },
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 500,
      poll: 1000
    }
  }
}

export {
  appConfig
}
