const mysql = require("mysql2");
const { databaseConfig } = require("./config");
const util = require("util");

// Create a connection pool
const db = mysql.createPool(databaseConfig);

// Promisify the getConnection function
const getConnection = util.promisify(db.getConnection).bind(db);

// Function to check the database connection
const checkDbConnection = async () => {
  try {
    const connection = await getConnection();
    console.log(
      `Database connection established on DATABASE_HOST: ${databaseConfig.host} and DATABASE_NAME: ${databaseConfig.database}`
        .cyan.italic
    );
    connection.release();
  } catch (error) {
    console.log(`Failed to connect to the database: ${error}`.red.italic);
    process.exit(1);
  }
};

module.exports = { db, checkDbConnection };
