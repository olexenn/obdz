import * as dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) throw new Error("No .env file");

export const config = {
  port: parseInt(process.env.PORT),

  db: {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["build/entity/*.js"],
    logging: true,
    synchronize: true,
  },
};
