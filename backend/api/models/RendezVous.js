import { DataTypes } from 'sequelize';
import { sequelize } from './inde.js';
import  patients  from './Patients.js';
import praticiens from './Praticien.js';


const RendezVous = sequelize.define('RendezVous', {
  id_rendezvous: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date_rdv: DataTypes.DATE,
  motif: DataTypes.STRING,
  type: DataTypes.STRING,
  id_patient: {
    type: DataTypes.INTEGER,
    references: {
      model: patients,         // 🔗 lien vers Patient
      key: 'id_patient'
    },
    onDelete: 'CASCADE',      // 🧨 suppression en cascade
    onUpdate: 'CASCADE'
  },
  id_pro: {
    type: DataTypes.INTEGER,
    references: {
      model: praticiens,         // 🔗 lien vers Praticien
      key: 'id_pro'
    },
    onDelete: 'CASCADE',      // 🧨 suppression en cascade
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'rendezvous',
  timestamps: false
});

// 🔗 Relations
patients.hasMany(RendezVous, { foreignKey: 'id_patient', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
RendezVous.belongsTo(patients, { foreignKey: 'id_patient' });

praticiens.hasMany(RendezVous, { foreignKey: 'id_pro', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
RendezVous.belongsTo(praticiens, { foreignKey: 'id_pro' });

export default RendezVous;