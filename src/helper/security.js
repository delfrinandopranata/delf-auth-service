/*
 * src/helper/security.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * 2021 @ Delfrinando Pranata (delfrinando@gmail.com)
 * */

const { sign, verify } = require('jsonwebtoken');
const { compare } = require('bcryptjs');

const SECRET = process.env.JWT_SECRET || 'DELFRINANDOPRANATA';

const signToken = (user) => {
  const data = { id: user.id, roles: user.roles || [] };
  const secret = Buffer.from(SECRET, 'base64');
  return sign(data, secret, { expiresIn: 3600 });
};

const verifyToken = (event, _, callback) => {
  const token = event.authorizationToken.replace('Bearer ', '');
  const { methodArn } = event;

  if (!token || !methodArn) return callback(null, 'Unauthorized');
  const secret = Buffer.from(SECRET, 'base64');
  const decoded = verify(token, secret);

  let permission = 'Deny';
  if (decoded && decoded.id) permission = 'Allow';

  const policy = {
    principalId: decoded.id,
    policyDocument: { Version: '2012-10-17', Statement: [{ Action: 'execute-api:Invoke', Effect: permission, Resource: methodArn }] },
  };

  return callback(null, policy);
};

const getUserFromToken = (token) => {
  const secret = Buffer.from(SECRET, 'base64');
  return verify(token.replace('Bearer ', ''), secret);
};

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
  verifyToken,
  signToken,
  getUserFromToken,
  checkPassword,
  isValidEmail,
};
