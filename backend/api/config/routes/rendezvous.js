import express from 'express';
const router = express.Router();
import { checkApiKey } from '../middleware/apiKeyAuth.js';
import  Praticien  from '../../models/Praticien.js';
import jwt from 'jsonwebtoken';
import pool from '../db.js';  // adjust path as appropriate


// --- Récupérer les praticiens ---
router.get('/praticiens', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."Praticiens" ORDER BY firstname ASC;');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des praticiens' });
  }
});

// --- Récupérer le calendrier d’un praticien ---
router.get('/calendar/:praticienId', async (req, res) => {
  try {
    const { praticienId } = req.params;
    const { month, year } = req.query;
    const daysInMonth = new Date(year, month, 0).getDate();

    const start = `${year}-${month.padStart(2, '0')}-01`;
    const end = `${year}-${month.padStart(2, '0')}-${daysInMonth}`;

    const { rows } = await pool.query(
      'SELECT * FROM reservations WHERE praticien_id = $1 AND date_reservation BETWEEN $2 AND $3',
      [praticienId, start, end]
    );

    const reservedDates = new Map(rows.map(r => [r.date_reservation.toISOString().split('T')[0], r.status]));

    const calendar = Array.from({ length: daysInMonth }, (_, i) => {
      const dateStr = `${year}-${month.padStart(2, '0')}-${(i + 1).toString().padStart(2, '0')}`;
      const status = reservedDates.get(dateStr) || 'nonReservable';
      return { date: i + 1, month: +month, year: +year, status };
    });

    res.json(calendar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors du chargement du calendrier' });
  }
});

// --- Réserver un jour ---
router.post('/calendar/:praticienId/reserve', async (req, res) => {
  try {
    const { praticienId } = req.params;
    const { year, month, date } = req.body;
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;

    await pool.query(
      `INSERT INTO reservations (praticien_id, date_reservation, status)
       VALUES ($1, $2, 'reserved')
       ON CONFLICT (praticien_id, date_reservation)
       DO UPDATE SET status = 'reserved'`,
      [praticienId, dateStr]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la réservation' });
  }
});

// --- Annuler une réservation ---
router.delete('/api/calendar/:praticienId/:date', async (req, res) => {
  try {
    const { praticienId, date } = req.params;
    await pool.query(
      'DELETE FROM reservations WHERE praticien_id = $1 AND date_reservation = $2',
      [praticienId, date]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l’annulation' });
  }
});

export default router;  // or whatever you’re exporting
