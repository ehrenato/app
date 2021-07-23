
import sql1 from "mssql";
import { db } from "../routes/config";

export const dbSettings = {
  user: db.user,
  password: dd.passwordssword,
  server: db.server,
  database: db.database,
  options: {
    encrypt: false
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql1.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

export { sql1 };