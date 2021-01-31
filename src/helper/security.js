/*
 * src/helper/security.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * 2021 @ Delfrinando Pranata (delfrinando@gmail.com)
 * */

const Jwt = require('jsonwebtoken');
const { compare } = require('bcryptjs');

const SECRET = Buffer.from(process.env.JWT_SECRET || 'DELFRINANDOPRANATA', 'base64');

const signToken = (user) => {
  const data = {
    id: user.id,
    email: user.email,
    roles: user.roles || [],
  };
  return Jwt.sign(data, SECRET, { expiresIn: 3600 });
};

const verify = (token) => {
  const decoded = Jwt.verify(token.replace('Bearer ', ''), SECRET);
  return decoded;
};

const verifyToken = (event, _, callback) => {
  const { methodArn } = event;
  const token = event.authorizationToken;
  if (!token || !methodArn) return callback(null, 'Unauthorized');
  const decoded = verify(token);

  const policy = {
    principalId: decoded.id,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: decoded && decoded.id ? 'Allow' : 'Deny',
        Resource: 'arn:aws:execute-api:*:*:*',
      }],
    },
  };

  return callback(null, policy);
};

const getUserFromToken = (token) => verify(token.replace('Bearer ', ''), SECRET);

const isValidEmail = (email) => {
  const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!email) return false;

  if (email.length > 254) return false;

  const valid = emailRegex.test(email);
  if (!valid) return false;

  const parts = email.split('@');
  if (parts[0].length > 64) return false;

  const domainParts = parts[1].split('.');
  if (domainParts.some((part) => part.length > 63)) return false;

  return true;
};

const checkPassword = (loginPassword, userPassword) => compare(loginPassword, userPassword);

module.exports = {
  verify,
  verifyToken,
  signToken,
  getUserFromToken,
  checkPassword,
  isValidEmail,
};
