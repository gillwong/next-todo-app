import mysql from "mysql2/promise";

export default async function connectToDb() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST ?? "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME ?? "todo_app",
    });
    await db.connect();
    return db;
  } catch (error) {
    throw new Error("Failed to connnect to database");
  }
}