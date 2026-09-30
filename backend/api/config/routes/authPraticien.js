import express, { Router } from 'express';
const router = express.Router();
import Praticien from '../../models/Praticien.js';
import jwt from 'jsonwebtoken';
import { checkApiKey } from '../middleware/apiKeyAuth.js';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' })

// Enregistrement d’un utilisateur praticien
router.post('/register/praticien', checkApiKey, async (req, res) => {
  try {
    const { sexe, firstname, lastname, email, date_naissance, telephone, adresse_cabinet, image, password, date_inscription, specialites } = req.body;
    const userExists = await Praticien.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'Utilisateur déjà existant' });

    const newPraticien = new Praticien({sexe, firstname, lastname, email, date_naissance, telephone, adresse_cabinet, image, password, date_inscription, specialites });
    await newPraticien.save();
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connexion de l’utilisateur + gestion du 2FA
router.post('/login/praticien', checkApiKey, async (req, res) => {
  try {
    const { email, password } = req.body;

    const praticienInstance = await Praticien.findOne({ where: { email } });

    if (!praticienInstance) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérification du mot de passe
    const isMatch = await praticienInstance.comparePassword(password);
    console.log("the value of is match:" , isMatch)
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // 🔹 Étape 1 : si 2FA non encore configuré → générer QR code
    if (!praticienInstance.otp_secret) {
      const secret = speakeasy.generateSecret({
        name: `Hafya (${email})`,
      });

      await praticienInstance.update({ otp_secret: secret.base32 });

      const qrCode = await qrcode.toDataURL(secret.otpauth_url);

      return res.status(200).json({
        success: true,
        requires2FA: true,
        qrCode,
        message: 'Scannez ce QR code avec Google Authenticator 📱',
      });
    }

    // 🔹 Étape 2 : si déjà configuré → demande OTP uniquement
    return res.status(200).json({
      success: true,
      requires2FA: true,
      message: 'Veuillez entrer votre code OTP 🔐',
    });

  } catch (err) {
    console.error('Erreur login/praticien', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/praticien', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email query parameter is required' });
    }

    const praticien = await Praticien.findOne({ where: { email } });

    if (!praticien) {
      return res.status(404).json({ error: 'Praticien not found' });
    }

    res.status(200).json({
      id: praticien.id_pro,
      sexe: praticien.sexe,
      firstname: praticien.firstname,
      lastname: praticien.lastname,
      email: praticien.email,
      datedenaissance: praticien.date_naissance,
      telephone: praticien.telephone,
      adresse_cabinet: praticien.adresse,
      image: praticien.image,
      dateinscription: praticien.date_inscription,
      specialites: praticien.specialites,
    });
  } catch (err) {
    console.error('Error fetching Praticien:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;
