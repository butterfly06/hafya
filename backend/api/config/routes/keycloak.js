import express, { Router } from 'express';
const router = express.Router();

import dotenv from 'dotenv';
dotenv.config({ path: './.env' })


const KEYCLOAK_URL = 'http://localhost:8080';
const REALM = 'MyRealm';
const CLIENT_ID = 'HAFYA';
const CLIENT_SECRET = 'testerictoto'; // Only for confidential clients
const REDIRECT_URI = 'http://localhost:4200';

router.post('/auth/code', async (req, res) => {
  const { code } = req.body;

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET); // Omit for public clients
    params.append('code', code);
    params.append('redirect_uri', REDIRECT_URI);

    const response = await router.post(
      `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
      params
    );

    res.json(response.data); // Returns tokens: access_token, id_token, refresh_token
  } catch (err) {
    console.error(err.response.data);
    res.status(500).json({ error: 'Token exchange failed' });
  }
});

router.get('/protected', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send('Missing token');

  const token = auth.split(' ')[1];
  // In production, validate the token signature and expiration
  res.json({ message: 'Protected data', token });
});

export default router;