import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const requiredEnv = ["DATABASE_URL", "JWT_SECRET"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environmental variable: ${key}`);
  }
});

export const DATABASE_URL = process.env.DATABASE_URL!;
export const PORT = process.env.PORT || 3001;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const CORS_ORIGIN = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173"];
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
