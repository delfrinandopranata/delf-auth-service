/*
 * src/database/config.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * 2021 @ Delfrinando Pranata (delfrinando@gmail.com)
 * */

const lodash = require('lodash');
const { generateHtml } = require('./template');
const schema = require('./delf-auth-service-api.json');

const getApiSpec = (host) => {
  if (host.includes('localhost')) {
    return {
      ...schema, host, basePath: '/dev', schemes: ['http'],
    };
  }

  return {
    ...schema, host, basePath: '/dev', schemes: ['https'],
  };
};

const handler = (event, _, callback) => {
  const host = lodash.get(event, 'headers.host') || lodash.get(event, 'headers.Host');
  const spec = getApiSpec(host);
  const body = generateHtml(spec);

  const response = {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body,
  };

  callback(null, response);
};

module.exports = { handler };
