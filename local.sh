
# 
#  local.sh
# 
#  Unauthorized copying of this file, via any medium is strictly prohibited
#  Proprietary and confidential
# 
#  2021 @ Delfrinando Pranata (delfrinando@gmail.com)
# 


nvm use 12
npm install serverless -g
npm install

export IS_LOCAL=true

export JWT_SECRET=DELFRINANDOPRANATA

export ENVIRONMENT=dev
export STAGE=dev
export REGION=ap-southeast-1

export USERS_TABLE=users_dev
export ROLES_TABLE=roles_dev
export PERMISSIONS_TABLE=permissions_dev