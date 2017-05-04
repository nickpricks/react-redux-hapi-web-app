const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Profile = sequelize.define(
    'Profile',
    {
      userId: { type: Sequelize.BIGINT },

      firstName: { type: Sequelize.STRING },
      middleName: { type: Sequelize.STRING },
      lastName: { type: Sequelize.STRING },

      fatherName: { type: Sequelize.STRING },
      motherName: { type: Sequelize.STRING },

      gender: { type: Sequelize.ENUM('male', 'female') },

      dateOfBirth: { type: Sequelize.DATE },
      placeOfBirth: { type: Sequelize.STRING },

      homePhone: { type: Sequelize.STRING },
      cellPhone: { type: Sequelize.STRING },

      address: { type: Sequelize.STRING },
      city: { type: Sequelize.STRING },
      state: { type: Sequelize.STRING },
      zipCode: { type: Sequelize.STRING },

    },
    {
      tableName: 'profiles',
    }
  );

  return Profile;
};
