/*
 * src/database/config.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * 2021 @ Delfrinando Pranata (delfrinando@gmail.com)
 * */

const TITLE = 'API Documentation - Auth Service by Delfrinando Pranata';
const UNPKG_BASE_URL = '//unpkg.com/swagger-ui-dist@3.24.2';

function generateHtml(spec) {
  const specStr = JSON.stringify(spec, undefined, 4);

  return `
    <!-- HTML for static distribution bundle build -->
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${TITLE}</title>
      <link rel="stylesheet" type="text/css" href="${UNPKG_BASE_URL}/swagger-ui.css">
      <link rel="icon" type="image/png" href="${UNPKG_BASE_URL}/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="${UNPKG_BASE_URL}/favicon-16x16.png" sizes="16x16" />
      <style>
        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }

        *,
        *:before,
        *:after { box-sizing: inherit; }

        body { margin: 0; background: #fafafa; }
      </style>
    </head>

    <body>
      <div id="swagger-ui"></div>

      <script src="${UNPKG_BASE_URL}/swagger-ui-bundle.js"> </script>
      <script src="${UNPKG_BASE_URL}/swagger-ui-standalone-preset.js"> </script>
      <script>
        window.onload = function () {
          // Begin Swagger UI call region
          const ui = SwaggerUIBundle({
            spec: ${specStr},
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            plugins: [SwaggerUIBundle.plugins.DownloadUrl],
            layout: "BaseLayout"
          })
          // End Swagger UI call region

          window.ui = ui
        }
      </script>
    </body>

    </html>
  `;
}

module.exports = { generateHtml };
