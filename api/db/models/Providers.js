const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Provider = sequelize.define(
    'Profile',
    {
      userId: { type: Sequelize.BIGINT },

      fbId: { type: Sequelize.STRING },
      fbToken: { type: Sequelize.STRING },

      googleId: { type: Sequelize.STRING },
      googleToken: { type: Sequelize.STRING },

      twitterId: { type: Sequelize.STRING },
      twitterToken: { type: Sequelize.STRING },

      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    },
    {
      tableName: 'providers',
    }
  );

  return Provider;
};
