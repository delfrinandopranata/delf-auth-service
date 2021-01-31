/*
 * src/database/role.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * 2021 @ Delfrinando Pranata (delfrinando@gmail.com)
 * */

const { User, UsersTable } = require('./config');
const { verify, SECRET } = require('../helper/security');

const create = async (args) => {
  await User.put(args);
};

const getAll = async () => {
  const data = await UsersTable.scan({ parse: true });
  return data.Items;
};

const getByEmail = async (email) => {
  const data = await UsersTable.query(email, { parse: true, index: 'ByEmail' });
  return data.Items && data.Items[0];
};

const getByUsername = async (username) => {
  const data = await UsersTable.query(username, { parse: true, index: 'ByUsername' });
  return data.Items && data.Items[0];
};

const getById = async (id) => {
  const data = await UsersTable.query(id, { parse: true });
  return data.Items && data.Items[0];
};

const assignRole = async (args) => {
  const item = { id: args.id, email: args.email, roles: { $add: args.roles } };
  const data = await User.update(item);
  return data.Items && data.Items[0];
};

const getPermissions = async (args) => {
  const dataPermissions = args.permissions;
  if (dataPermissions && dataPermissions.length) {
    const user = await UsersTable.query(args.id, { parse: true });
    const userPermissions = user.Items[0].permissions;
    if (userPermissions && userPermissions.length) {
      const allow = dataPermissions.filter((x) => userPermissions.includes(x));
      const deny = dataPermissions.filter((x) => !userPermissions.includes(x));

      return { permissons: { allow, deny } };
    }
  }
  return { permissons: { allow: {}, deny: {} } };
};

const getUserFromToken = (token) => {
  const user = verify(token);
  return {
    id: user.id,
    email: user.email,
  };
};

module.exports = {
  getUserFromToken,
  create,
  getAll,
  getByEmail,
  getByUsername,
  getById,
  assignRole,
  getPermissions,
};
