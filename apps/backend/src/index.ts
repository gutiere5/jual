import express, { Express } from "express";
import cors from "cors";
import { DATABASE_URL, PORT } from "./secrets";
import { errorHandler } from "./middleware/errorHandler";
import rootRouter from "./routes";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Private-Network", "true");
  next();
});
app.use(errorHandler);
app.use(express.json());
app.use("/", rootRouter);

const connectionString = `${DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
export const prismaClient = new PrismaClient({ adapter });

app.listen(PORT, () => {
  console.log(`App Working on port ${PORT}!`);
});
