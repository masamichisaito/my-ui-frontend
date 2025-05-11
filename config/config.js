require('dotenv').config({ path: path.resolve(__dirname, '../.env.test') }); // ←これなら backend/.env.test を読める

module.exports = {
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  // dev, productionも同様
};