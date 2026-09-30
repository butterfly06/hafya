import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
const router = express.Router();
import express from 'express';
import { checkApiKey } from '../middleware/apiKeyAuth.js';
import  Patient  from '../../models/Patients.js';
import jwt from 'jsonwebtoken';




// ✅ Vérifier un code OTP (6 chiffres)
// Vérification du code OTP (Google Authenticator or Duo mobile )
router.post('/verify/patient', checkApiKey, async (req, res) => {
  try {
    const { email, token } = req.body;

    // Recherche le patient
    const patientInstance = await Patient.findOne({ where: { email } });
    if (!patientInstance || !patientInstance.otp_secret) {
      return res.status(400).json({ message: 'Utilisateur non configuré pour le 2FA' });
    }

    // Vérification du code OTP avec speakeasy
    const verified = speakeasy.totp.verify({
      secret: patientInstance.otp_secret,
      encoding: 'base32',
      token,
      window: 1, // autorise un décalage d'un pas (30s)
    });

    if (!verified) {
      return res.status(401).json({ success: false, message: 'Code OTP invalide ❌' });
    }

    // Génère un JWT après validation du 2FA
    const jwtToken = jwt.sign(
      { PatientId: patientInstance.id_patient },
      process.env.DB_JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Connexion réussie ✅',
      token: jwtToken,
      Patient: {
        id: patientInstance.id_patient,
        firstname: patientInstance.firstname,
        lastname: patientInstance.lastname,
        email: patientInstance.email,
      }
    });

  } catch (error) {
    console.error('Erreur verify/patient:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


export default router;