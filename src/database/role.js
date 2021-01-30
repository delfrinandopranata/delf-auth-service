/*
 * src/database/role.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * 2021 @ Delfrinando Pranata (delfrinando@gmail.com)
 * */

const { Role, RolesTable } = require('./config');

const create = async (args) => {
  await Role.put(args);
};

const getAll = async () => {
  const data = await RolesTable.scan({ parse: true });
  return data.Items;
};

const getById = async (id) => {
  const data = await RolesTable.query(id, { parse: true });
  return data.Items && data.Items[0];
};

module.exports = {
  create,
  getAll,
  getById,
};
