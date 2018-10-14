import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'

const appConfig = (params) => {
  const { mode, rootDir, publicDir, version, entry, output, css } = params
  return {
    mode,
    entry: {
      app: [
        path.resolve(rootDir, 'app', entry),
        path.resolve(rootDir, 'app', 'styles', css || 'main.scss')
      ]
    },
    output: {
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
                  'react'
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
          use: [
            'style-loader',
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
      new CopyWebpackPlugin([
        {
          from: path.resolve(rootDir, 'static', 'images'),
          to: path.resolve(publicDir, 'images')
        }
      ]),
      new CopyWebpackPlugin([
        {
          from: path.resolve(rootDir, 'static', 'fonts'),
          to: path.resolve(publicDir, 'fonts')
        }
      ])
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
