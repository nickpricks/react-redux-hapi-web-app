const Sequelize = require('sequelize');
const settings = require('config').db;

const db = new Sequelize(settings.database, settings.username, settings.password, {
  host: settings.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
  },
});

module.exports = db;

module.exports.models = {
  Profile: require('./models/Profile')(db),
  User: require('./models/User')(db),
  ParticipantDetails: require('./models/Providers')(db),
};

// Associations
const models = module.exports.models;

models.Profile.belongsTo(models.User, { as: 'user' });
models.User.hasOne(models.Profile, { as: 'profile' });
