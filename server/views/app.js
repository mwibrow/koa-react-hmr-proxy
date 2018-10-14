import { config } from '../config'
import processEnv from '../lib/env'

const appView = () => `
<!DOCTYPE html>
<html lang="en">
<html>
  <head>
    <title>koa-react-hmr-proxy</title>
    <link rel="shortcut icon" id="favicon-cloudfind" href="/${config.version}/images/favicon.png" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
  </head>
  <body>
    <div id="app" class="app"></div>
    ${processEnv.NODE_ENV ? `<script type="text/javascript">
        window.env = '${processEnv.NODE_ENV}'
      </script>` : ''}
    <script type="application/javascript" src="/${config.version}/js/bundle.js"></script>
  </body>
</html>`

export default appView
