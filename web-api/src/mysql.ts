import { createConnection, Connection } from "mysql2/promise";
import config from "./config";

type Execute = (connection: Connection) => Promise<any>;

const connection = async (exec: Execute) => {
  let connection;
  let data;
  try {
    connection = await createConnection(config.mysql);
    data = exec(connection);
  } catch (e) {
    if (connection) {
      await connection.rollback();
      await connection.end();
    }
    throw e;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
  return data;
};

export default connection;

export const idgen = () => {
  return Date.now() - 1657341308962 + Math.floor(Math.random() * 1000);
};
