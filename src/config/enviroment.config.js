import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();
program.option("--mode <mode>", "Modo de Trabajo", "DEVELOPMENT");
program.parse();

dotenv.config({
  path:
    "./.env.production"

});

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  githubKey: process.env.GITHUB_CLIENT_SECRET,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  persistence: process.env.PERSISTENCE,
  apiUrl: process.env.API_URL,
  googleEmail: process.env.GOOGLE_EMAIL,
  googlePass: process.env.GOOGLE_PASS,
};
