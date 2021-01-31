/*
 * src/database/config.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * 2021 @ Delfrinando Pranata (delfrinando@gmail.com)
 * */

const { config, DynamoDB } = require('aws-sdk');
const { Table, Entity } = require('dynamodb-toolbox');
const { v4: uuidv4 } = require('uuid');

const {
  USERS_TABLE, ROLES_TABLE, PERMISSIONS_TABLE, REGION, IS_LOCAL,
} = process.env;

if (IS_LOCAL && IS_LOCAL === 'true') {
  config.update({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  });
}

config.update({
  region: REGION,
});

const dynamoClient = new DynamoDB.DocumentClient();

const RolesTable = new Table({
  name: ROLES_TABLE,
  partitionKey: 'id',
  sortKey: 'name',
  DocumentClient: dynamoClient,
});

const UsersTable = new Table({
  name: USERS_TABLE,
  partitionKey: 'id',
  sortKey: 'email',
  indexes: {
    ByEmail: { partitionKey: 'email' },
    ByUsername: { partitionKey: 'username' },
  },
  DocumentClient: dynamoClient,
});

const PermissionsTable = new Table({
  name: PERMISSIONS_TABLE,
  partitionKey: 'id',
  sortKey: 'name',
  DocumentClient: dynamoClient,
});

const Role = new Entity({
  name: ROLES_TABLE,
  attributes: {
    id: { type: 'string', partitionKey: true, default: () => uuidv4() },
    name: { sortKey: true, type: 'string', required: true },
    permissions: { type: 'set', setType: 'string' },
  },
  table: RolesTable,
});

const Permission = new Entity({
  name: PERMISSIONS_TABLE,
  attributes: {
    id: { type: 'string', partitionKey: true, default: () => uuidv4() },
    name: { sortKey: true, type: 'string', required: true },
  },
  table: PermissionsTable,
});

const User = new Entity({
  name: USERS_TABLE,
  attributes: {
    id: { type: 'string', partitionKey: true, default: () => uuidv4() },
    email: { sortKey: true, type: 'string', required: true },
    username: { type: 'string', required: true },
    password: { type: 'string', required: true },
    roles: { type: 'set', setType: 'string' },
    permissions: { type: 'set', setType: 'string' },
  },
  table: UsersTable,
});

module.exports = {
  Role,
  RolesTable,
  Permission,
  PermissionsTable,
  UsersTable,
  User,
};
