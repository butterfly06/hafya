import { DataTypes } from 'sequelize';
import { sequelize } from '../models/inde.js';

const Notification = sequelize.define('Notification', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

export default Notification;
