module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'providers',
    {
      id: { type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true },

      userId: { type: Sequelize.BIGINT, allowNull: false },

      fbId: { type: Sequelize.STRING },
      fbToken: { type: Sequelize.STRING },

      googleId: { type: Sequelize.STRING },
      googleToken: { type: Sequelize.STRING },

      twitterId: { type: Sequelize.STRING },
      twitterToken: { type: Sequelize.STRING },

      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    }),

  down: (queryInterface) => queryInterface.dropTable('providers')
};
