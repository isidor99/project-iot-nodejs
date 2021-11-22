import mysql from "mysql";
const { createConnection } = mysql;

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "project_iot",
  multipleStatements: true,
});

connection.connect();

export default connection;
