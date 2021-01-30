nvm use 12

export SKIP_NVM=${SKIP_NVM:-"false"}
if [[ "$SKIP_NVM" == *false* ]]; then
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm install
  npm i -g yarn
  yarn global add node-pre-gyp
  yarn global add eslint
  yarn install
fi

export USERS_TABLE=users_dev
export ROLES_TABLE=roles_dev
export PERMISSIONS_TABLE=permissions_dev
export REGION=ap-southeast-1
export JWT_SECRET=DELFRINANDOPRANATA