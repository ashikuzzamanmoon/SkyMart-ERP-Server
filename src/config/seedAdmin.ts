import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../modules/user/user.model';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('Connected to Database successfully!');

    const adminEmail = 'admin@miniERP.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists!');
    } else {
      await User.create({
        name: 'System Admin',
        email: adminEmail,
        password: 'Admin123!',
        role: 'admin',
      });
      console.log('Admin user seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
    process.exit(0);
  }
};

seedAdmin();
