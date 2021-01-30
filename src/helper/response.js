/*
 * src/helper/response.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * 2021 @ Delfrinando Pranata (delfrinando@gmail.com)
 * */

const response = (code, args) => {
  const data = args;
  const statusCode = code || data.statusCode;
  const message = data && data.message;
  let body;
  switch (statusCode) {
    case 200:
      body = {
        status: 200,
        message: message || 'OK',
        data,
      };
      break;
    case 400:
      body = {
        status: 400,
        message: message || 'Bad Request',
        data,
      };
      break;
    case 401:
      body = {
        status: 401,
        message: message || 'Unauthorized',
        data,
      };
      break;
    case 404:
      body = {
        status: 404,
        message: message || 'Not Found',
        data,
      };
      break;
    case 500:
      body = {
        status: 500,
        message: message || 'Internal Server Error',
        data,
      };
      break;
    default:
      body = {
        status: 502,
        message: message || 'Unknown Error',
        data,
      };
      break;
  }
  return {
    statusCode,
    body: JSON.stringify(body, null, 2),
  };
};

module.exports = { response };
