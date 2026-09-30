import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
const router = express.Router();
import express from 'express';
import { checkApiKey } from '../middleware/apiKeyAuth.js';
import  Praticien  from '../../models/Praticien.js';
import jwt from 'jsonwebtoken';



// ✅ Vérifier un code OTP (6 chiffres)
// Vérification du code OTP (Google Authenticator or Duo mobile )
router.post('/verify/praticien', checkApiKey, async (req, res) => {
  try {
    const { email, token } = req.body;

    // Recherche le patient
    const praticienInstance = await Praticien.findOne({ where: { email } });
    if (!praticienInstance || !praticienInstance.otp_secret) {
      return res.status(400).json({ message: 'Utilisateur non configuré pour le 2FA' });
    }

    // Vérification du code OTP avec speakeasy
    const verified = speakeasy.totp.verify({
      secret: praticienInstance.otp_secret,
      encoding: 'base32',
      token,
      window: 1, // autorise un décalage d'un pas (30s)
    });

    if (!verified) {
      return res.status(401).json({ success: false, message: 'Code OTP invalide ❌' });
    }

    // Génère un JWT après validation du 2FA
    const jwtToken = jwt.sign(
      { PraticienId: praticienInstance.id_praticien },
      process.env.DB_JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Connexion réussie ✅',
      token: jwtToken,
      Praticien: {
        id: praticienInstance.id_pro,
        firstname: praticienInstance.firstname,
        lastname: praticienInstance.lastname,
        email: praticienInstance.email,
        sexe: praticienInstance.sexe,
        date_naissance: praticienInstance.date_naissance,
        adresse_cabinet: praticienInstance.adresse_cabinet,
        image: praticienInstance.image,
      }
    });

  } catch (error) {
    console.error('Erreur verify/praticien:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


export default router;