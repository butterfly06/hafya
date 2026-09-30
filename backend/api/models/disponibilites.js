import { DataTypes } from 'sequelize';
import sequelize from '../models/inde.js';
import bcrypt from 'bcrypt';
// import Praticien from "./Praticien.js";
// import Patient from "./Patients.js";
import  patients  from './Patients.js';
import praticiens from './Praticien.js';

const Disponibilite = sequelize.define("Disponibilite", {
  date: { type: DataTypes.DATE, allowNull: false },
  estReserve: { type: DataTypes.BOOLEAN, defaultValue: false },}, {
  timestamps: false,
});

// Relations
praticiens.hasMany(Disponibilite, { onDelete: "CASCADE" });
Disponibilite.belongsTo(praticiens);

patients.hasMany(Disponibilite);
Disponibilite.belongsTo(patients);



export default Disponibilite;
