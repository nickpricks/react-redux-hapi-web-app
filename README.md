#  react-redux-hapi-web-app

## Quick setup 

npm i --no-optional

npm run dev (will start localhost @ 3000 and api at 5000)

## MySql Database

Create an empty db (mag_dev, config/db.js - set user/password)
Run migrations and seeders 
  
  sequelize db:migrate
  sequelize db:seed:all


## Tests etc

Configure eslint