import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './modules/user/user.model';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL as string;

const seedUsers = async () => {
  try {
    if (!DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in the environment variables');
    }

    await mongoose.connect(DATABASE_URL);
    console.log('🛢️ Connected to MongoDB successfully for seeding');

    const users = [
      {
        name: 'Admin User',
        email: 'admin@skymart.com',
        password: 'Admin123',
        role: 'admin' as const
      },
      {
        name: 'Manager User',
        email: 'manager@skymart.com',
        password: 'Manager123',
        role: 'manager' as const
      },
      {
        name: 'Employee User',
        email: 'employee@skymart.com',
        password: 'Employee123',
        role: 'employee' as const
      }
    ];

    // Clear existing users just in case (optional, but good for a fresh seed)
    // await User.deleteMany({});
    // Actually, I'll just check if they exist, or use create which might fail if duplicate
    
    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        await User.create(userData);
        console.log(`✅ User ${userData.role} created successfully`);
      } else {
        console.log(`⚠️ User ${userData.role} already exists`);
      }
    }

    console.log('🌱 Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed database', error);
    process.exit(1);
  }
};

seedUsers();
