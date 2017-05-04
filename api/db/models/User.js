const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        set: function set(val) {
          this.setDataValue('email', val.toLowerCase());
        },

        validate: { isEmail: true },
      },

      pwd: { type: Sequelize.STRING(1000), allowNull: false },
      pwdSalt: { type: Sequelize.STRING, allowNull: false },

      resetPwdToken: { type: Sequelize.STRING(50) },
      resetPwdSentAt: { type: Sequelize.DATE },

      confirmationToken: { type: Sequelize.STRING(50) },
      confirmationSentAt: { type: Sequelize.DATE },
      confirmedAt: { type: Sequelize.DATE },
      unconfirmedEmail: { type: Sequelize.STRING },

      failedAttempts: { type: Sequelize.INTEGER, defaultValue: 0 },
      unlockToken: { type: Sequelize.STRING(50) },
      lockedAt: { type: Sequelize.DATE },

      signInCount: { type: Sequelize.INTEGER, defaultValue: 0 },
      currentSignInAt: { type: Sequelize.DATE },
      lastSignInAt: { type: Sequelize.DATE },
      currentSignInIP: { type: Sequelize.STRING(50) },
      lastSignInIP: { type: Sequelize.STRING(50) },

      role: { type: Sequelize.INTEGER(2).UNSIGNED },
      accessLevel: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },

      isActive: { type: Sequelize.BOOLEAN },

      IsDeleted: { type: Sequelize.BOOLEAN },

      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    },
    {
      tableName: 'users',
      instanceMethods: {
        toJSON: function toJSON() {
          const user = Object.assign({}, this.dataValues);
          const profile = this.profile && this.profile.dataValues;
          delete user.pwd;
          delete user.pwdSalt;

          if (profile) {
            user.profile = profile;
          }

          return user;
        },
      },
    }
  );


  return User;
};
