module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'users',
    {
      id: { type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      pwd: { type: Sequelize.STRING(1000), allowNull: false },
      pwdSalt: { type: Sequelize.STRING, allowNull: false },

      resetPwdToken: { type: Sequelize.STRING(50) },
      resetPwdSentAt: { type: Sequelize.DATE },

      confirmationToken: { type: Sequelize.STRING(50) },
      confirmationSentAt: { type: Sequelize.DATE },

      signInCount: { type: Sequelize.INTEGER, defaultValue: 0 },
      currentSignInAt: { type: Sequelize.DATE },
      lastSignInAt: { type: Sequelize.DATE },

      role: { type: Sequelize.INTEGER(2).UNSIGNED },

      isDeleted: { type: Sequelize.BOOLEAN },

      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    }),

  down: (queryInterface) => queryInterface.dropTable('users')
};
