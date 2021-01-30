/*
 * src/database/permissions.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * 2021 @ Delfrinando Pranata (delfrinando@gmail.com)
 * */

const { Permission, PermissionsTable } = require('./config');

const create = async (args) => {
  await Permission.put(args);
};

const getAll = async () => {
  const data = await PermissionsTable.scan({ parse: true });
  return data.Items;
};

const getById = async (id) => {
  const data = await PermissionsTable.query(id, { parse: true });
  return data.Items && data.Items[0];
};

module.exports = {
  create,
  getAll,
  getById,
};
