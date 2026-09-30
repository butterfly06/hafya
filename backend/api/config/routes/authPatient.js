import express, { Router } from 'express';
const router = express.Router();
import Patient from '../../models/Patients.js';
import jwt from 'jsonwebtoken';
import { checkApiKey } from '../middleware/apiKeyAuth.js';
import dotenv from 'dotenv';
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';
import { QueryTypes } from 'sequelize';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

dotenv.config({ path: './.env' })

// Enregistrement d’un utilisateur
router.post('/register/patient', checkApiKey, async (req, res) => {
  try {
    const { sexe, firstname, lastname, email, date_naissance, telephone, adresse, image, password, date_inscription } = req.body;
    const userExists = await Patient.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'Utilisateur déjà existant' });

    const newPatient = new Patient({sexe, firstname, lastname, email, date_naissance, telephone, adresse, image, password, date_inscription });
    await newPatient.save();
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Connexion de l’utilisateur + gestion du 2FA
router.post('/login/patient', checkApiKey, async (req, res) => {
  try {
    const { email, password } = req.body;

    const patientInstance = await Patient.findOne({ where: { email } });

    if (!patientInstance) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérification du mot de passe
    const isMatch = await patientInstance.comparePassword(password);
    console.log("the value of is match:" , isMatch)
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // 🔹 Étape 1 : si 2FA non encore configuré → générer QR code
    if (!patientInstance.otp_secret) {
      const secret = speakeasy.generateSecret({
        name: `Hafya (${email})`,
      });

      await patientInstance.update({ otp_secret: secret.base32 });

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
    console.error('Erreur login/patient:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/patient',  checkApiKey, async (req, res) => {
    try {
    //const { email } = req.body;
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email body parameter is required' });
    }

    const patient = await Patient.findOne({ where: { email } });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    return res.status(200).json({
      id: patient.id_patient,
      sexe: patient.sexe,
      firstname: patient.firstname,
      lastname: patient.lastname,
      email: patient.email,
      datedenaissance: patient.date_naissance,
      telephone: patient.telephone,
      adresse: patient.adresse,
      image: patient.image,
      dateinscription: patient.date_inscription,
      
    });
  } catch (error) {
    console.error('Error fetching patient:', error);
    return res.status(500).json({ error: 'Failed to fetch patient' });
  }
});




// forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const patient = await Patient.findOne({  where: { email } });
    if (!patient) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    console.log("This is token", token)
    patient.resetPasswordToken = token;
    patient.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await patient.save();
   const testAccount = await nodemailer.createTestAccount();
    // Configure email (example using Gmail)
  const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass
  },
  tls: {
    rejectUnauthorized: false    // 👈 disables certificate validation
  }
});

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // const mailOptions = {
    //   to: patient.email,
    //   from: process.env.EMAIL_USER,
    //   subject: "Réinitialisation de mot de passe",
    //   html: `
    //     <p>Bonjour,</p>
    //     <p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
    //     <a href="${resetLink}">${resetLink}</a>
    //     <p>Ce lien expirera dans 1 heure.</p>
    //   `
    // };

     // 🔹 Define mail options before using them ✅
    

    const mailOptions = {
      from: "ericmvogo@yahoo.fr",
      to: "ericmvogo@yahoo.fr",
      subject: "Réinitialisation du mot de passe",
      html: `
        <p>Bonjour ${patient.firstname || ""},</p>
        <p>Voici le lien pour réinitialiser votre mot de passe :</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Ce lien expirera dans 1 heure.</p>
      `,
    };

    // 🔹 Now you can safely send the mail
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Preview URL:", nodemailer.getTestMessageUrl(info));


    res.json({ message: "Password reset link sent to email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//reset passwd
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    const patient = await Patient.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() } // not expired
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash and save new password
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(password, salt);

    // Clear token fields
    patient.resetPasswordToken = undefined;
    patient.resetPasswordExpires = undefined;

    await patient.save();

    res.json({ message: "Password reset successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// Vérification du code OTP (Google Authenticator or Duo mobile )
router.post('/verify-otp/patient', checkApiKey, async (req, res) => {
  try {
    const { email, token } = req.body;

    const patientInstance = await Patient.findOne({ where: { email } });
    if (!patientInstance || !patientInstance.otp_secret) {
      return res.status(400).json({ message: 'Utilisateur non configuré pour le 2FA' });
    }

    // Vérification du code OTP
    // const verified = speakeasy.totp.verify({
    //   secret: patientInstance.otp_secret,
    //   encoding: 'base32',
    //   token,
    //   window: 1,
    // });
console.log('🔐 OTP DEBUG:', {
  email,
  token,
  hasSecret: !!patientInstance.otp_secret,
  secretLength: patientInstance.otp_secret?.length,
  serverToken: speakeasy.totp({
    secret: patientInstance.otp_secret,
    encoding: 'base32'
  })
});

const verified = speakeasy.totp.verify({
  secret: patientInstance.otp_secret,
  encoding: 'base32',
  token,
  window: 1,
});
    if (!verified) {
      return res.status(401).json({ success: false, message: 'Code OTP invalide ❌' });
    }

    // Génère un JWT après validation du 2FA
    const jwtToken = jwt.sign(
      { PatientId: patientInstance.id_patient },
      process.env.DB_JWT_SECRET,
      { expiresIn: '1h' }
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
        datedenaissance: patientInstance.date_naissance,
        image: patientInstance.image,
      }
    });

  } catch (error) {
    console.error('Erreur verify-otp/patient:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


export default router;
