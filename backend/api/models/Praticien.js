import { DataTypes } from 'sequelize';
import { sequelize } from './inde.js';
import bcrypt from 'bcrypt';

const praticiens = sequelize.define('Praticiens', {
  id_pro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  sexe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
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
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  adresse_cabinet: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
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
  specialites: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  otp_secret: {
  type: DataTypes.STRING,
  allowNull: true,
}
}, 

{
  //tableName: 'Praticiens', // 👈 ensures Sequelize uses this exact table name
  
timestamps: false,
  hooks: {
    beforeCreate: async (praticiens) => {
      const salt = await bcrypt.genSalt(10);
      praticiens.password = await bcrypt.hash(praticiens.password, salt); // fixed variable
    }
  }
});

// Compare password method
praticiens.prototype.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default praticiens;
