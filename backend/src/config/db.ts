import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        // Just pass the URI string, no options needed anymore
        await mongoose.connect(process.env.DB_URI as string);
        console.log('✅ MongoDB connected successfully');
        // migrate-mongo's CommonJS entry wraps exports in Promises (Proxy); dynamic import loads real ESM API.
        const { default: migrateMongo } = await import('migrate-mongo');
        const { db, client } = await migrateMongo.database.connect();
        const migrated = await migrateMongo.up(db, client);
        migrated.forEach((fileName: string) => console.log('✅ Migrated:', fileName));
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
};

export default connectDB;
