import { DataTypes } from 'sequelize';
import sequelize from '../models/inde.js';
import bcrypt from 'bcrypt';



const User = sequelize.define('Patients', {
  id_patient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: true,
    unique: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
   image: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_inscription: {
    type: DataTypes.TIMESTAMP,
    allowNull: true,
    unique: false,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
});

// Méthode pour comparer les mots de passe
User.prototype.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default User;