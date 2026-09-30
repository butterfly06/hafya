import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Create a single Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
    pool: {
  max: 5,
  min: 0,
  idle: 10000,       // Close idle connections after 10s
  acquire: 30000,    // 30s max wait to get a connection
  evict: 1000,       // Check for idle connections every 1s
  handleDisconnects: true
}

  }
);

// Test the connection once (optional)
try {
  await sequelize.authenticate();
  console.log('✅ Database connected!');
} catch (error) {
  console.error('❌ Database connection failed:', error);
}

// Export both ways for flexibility
export { sequelize };
export default sequelize;
