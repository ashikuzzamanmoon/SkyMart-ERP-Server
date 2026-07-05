import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL as string;

let server: any;

async function bootstrap() {
  try {
    if (!DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in the environment variables');
    }
    
    await mongoose.connect(DATABASE_URL);
    console.log('🛢️ Connected to MongoDB successfully');

    server = app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to database', error);
    process.exit(1);
  }
}

bootstrap();

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection detected, closing server...', error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception detected, shutting down...', error);
  process.exit(1);
});
