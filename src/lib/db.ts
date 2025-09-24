import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in .env.local");

type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

// @ts-ignore
let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };
// @ts-ignore
global.mongooseCache = cached;

export async function dbConnect() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
