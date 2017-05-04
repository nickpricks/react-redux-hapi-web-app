module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'profiles',
    {
      id: { type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true },

      userId: {
        type: Sequelize.BIGINT(11),
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      },

      name: { type: Sequelize.STRING },

      gender: { type: Sequelize.ENUM('male', 'female') },

      dateOfBirth: { type: Sequelize.DATE },

      homePhone: { type: Sequelize.STRING },
      cellPhone: { type: Sequelize.STRING },

      address: { type: Sequelize.STRING },
      city: { type: Sequelize.STRING },
      state: { type: Sequelize.STRING },
      zipCode: { type: Sequelize.STRING },

      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    }),

  down: (queryInterface) => queryInterface.dropTable('profiles')
};
