import { DataTypes } from 'sequelize';
import { sequelize } from '../models/inde.js';
import bcrypt from 'bcrypt';



const patients = sequelize.define('Patients', {
  id_patient: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  allowNull: false
},
  sexe: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
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
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
   resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  otp_secret: {
  type: DataTypes.STRING,
  allowNull: true,
},
}, {
  timestamps: false,
  hooks: {
    beforeCreate: async (patients) => {
      const salt = await bcrypt.genSalt(10);
      patients.password = await bcrypt.hash(patients.password, salt);
    }
  }
});

// Méthode pour comparer les mots de passe
patients.prototype.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
export default patients;