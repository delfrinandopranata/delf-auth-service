/*
 * src//handler.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * 2021 @ Delfrinando Pranata (delfrinando@gmail.com)
 * */

const { hash } = require('bcryptjs');
const User = require('./database/user');
const Permission = require('./database/permission');
const Role = require('./database/role');
const Security = require('./helper/security');
const { response } = require('./helper/response');

module.exports.whoami = async (event) => {
  try {
    const tokenExtracted = await Security.getUserFromToken(event.headers.Authorization);
    return response(200, tokenExtracted);
  } catch (error) {
    return response(500, error);
  }
};

module.exports.login = async (event) => {
  const login = JSON.parse(event.body);
  let user;
  try {
    if (login.email && Security.isValidEmail(login.email)) {
      user = await User.getByEmail(login.email);
    }
    if (!user && login.username) {
      user = await User.getByUsername(login.username);
    }

    if (user) {
      const matched = await Security.checkPassword(login.password, user.password);
      if (matched) {
        return response(200, { token: Security.signToken(user), expiresIn: 3600 });
      }
      return response(400, { message: 'Password incorrect!' });
    }
    return response(404);
  } catch (error) {
    return response(500, error);
  }
};

module.exports.signup = async (event) => {
  const data = JSON.parse(event.body);
  try {
    if (data && data.email && Security.isValidEmail(data.email) && data.username && data.password) {
      const emailExist = await User.getByEmail(data.email);
      const usernameExist = await User.getByUsername(data.username);
      if (emailExist || usernameExist) {
        return response(404, { email: data.email, message: 'Email or username already exist!' });
      }
      data.password = await hash(data.password, 8);
      await User.create(data);
      return response(200, data);
    }
    return response(400);
  } catch (error) {
    return response(500, error);
  }
};

module.exports.users = async (event) => {
  try {
    const id = event.pathParameters && event.pathParameters.id;
    const userToken = await Security.getUserFromToken(event.headers.Authorization);
    if ((id && userToken.id) && (id !== userToken.id)) return response(401);

    const user = await User.getById(userToken.id);
    if (user) return response(200, user);

    return response(404);
  } catch (error) {
    return response(500, error);
  }
};

module.exports.permissions = async (event) => {
  const { httpMethod } = event;
  try {
    if (httpMethod === 'POST' && event.body) {
      const permissions = JSON.parse(event.body);
      await Permission.create(permissions);
    }

    const permissions = await Permission.getAll();
    return response(200, permissions);
  } catch (error) {
    return response(500, error);
  }
};

module.exports.roles = async (event) => {
  const { httpMethod } = event;
  try {
    if (httpMethod === 'POST' && event.body) {
      const roles = JSON.parse(event.body);
      await Role.create(roles);
    }

    const roles = await Role.getAll();
    return response(200, roles);
  } catch (error) {
    return response(500, error);
  }
};

module.exports.assignRole = async (event) => {
  const data = JSON.parse(event.body);
  try {
    const res = await User.assignRole(data);
    return response(200, res);
  } catch (error) {
    return response(500, error);
  }
};

module.exports.getPermissions = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const res = await User.getPermissions(data);
    return response(200, res);
  } catch (error) {
    return response(500, error);
  }
};

module.exports.allUsers = async () => {
  try {
    const user = await User.getAll();
    return response(200, user);
  } catch (error) {
    return response(500, error);
  }
};
