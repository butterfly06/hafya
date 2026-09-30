import express, { Router } from 'express';
import postgres from 'postgres';
import cors from 'cors';
import multer from 'multer';
import request from 'http';
import userRoutes from "./config/routes/userRoute.js"
import createUserTable from './data/createUserTable.js';
import con from './config/db.js';
import dotenv from 'dotenv';
import authPatientRoutes from "./config/routes/authPatient.js";
import authPraticienRoutes from "./config/routes/authPraticien.js";
import rendeVousRoutes from "./config/routes/rendezvous.js";
import chatRoutes from './config/routes/chatRoutes.js';
import uploadRoutes from './config/routes/upload.js'
import mfaRoutes from './config/routes/mfa.js'
import mfapraticiensRoutes from './config/routes/mfaPraticien.js'
import keycloadRoute from './config/routes/keycloak.js'
import notificationRoute from './config/routes/notifications.js';
import sequelize from './models/inde.js';
import { Server } from 'socket.io';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
dotenv.config({ path: './.env' })
const app = express();
console.log('DATABASE_URL:', process.env.DB_PORT);
const port =  5002;



var CONNECTION_STRING= "postgres://postgres:admin@localhost:5433/test";
 
var DATABASENAME ="test";
var database;



app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
  origin: 'http://localhost:4200',  // URL de ton Angular
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// 1️⃣ Create HTTP server from Express
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"]
});



console.log('🔥 SWAGGER CHARGÉ');
console.log('Swagger spec:', !!swaggerSpec);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Attach io to app so controllers can use it
app.set("io", io);

// Optional: log connections
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

// Enregistrement d’un utilisateur
app.use('/api/auth', authPatientRoutes);
app.use('/api/auth', authPraticienRoutes);
app.use('/api', chatRoutes);
app.use('/api', uploadRoutes);
app.use('/api', keycloadRoute);
app.use('/api', rendeVousRoutes);
app.use('/api/auth/mfa', mfaRoutes);
app.use('/api/auth/mfa', mfapraticiensRoutes);
app.use('/api/notifications', notificationRoute)





sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Base de données connectée et synchronisée.');

    server.listen(port, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
      console.log(`📚 Swagger disponible sur http://localhost:${port}/api-docs`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à la base de données :', err);
  });