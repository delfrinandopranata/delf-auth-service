/*
 * src/database/config.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * 2021 @ Delfrinando Pranata (delfrinando@gmail.com)
 * */

const _ = require('lodash');

const { generateHtml } = require('./template');
const schema = require('./delf-auth-service-api.json');

const stage = process.env.ENV;

function getApiSpec(host) {
  if (host.includes('localhost')) {
    return {
      ...schema,
      host,
      basePath: '/dev',
      schemes: ['http'],
    };
  }

  return {
    ...schema,
    host,
    basePath: `/${stage}`,
    schemes: ['https'],
  };
}

function handler(event, _context, callback) {
  const host = _.get(event, 'headers.host') || _.get(event, 'headers.Host');
  const spec = getApiSpec(host);
  const body = generateHtml(spec);

  const response = {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body,
  };

  callback(null, response);
}

module.exports = { handler };
