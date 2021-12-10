const { Sequelize, DataTypes } = require('sequelize');

const ssl = process.env.DATABASE_URL.includes("localhost") ? undefined : { require: true, rejectUnauthorized: false };
const connection = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: { ssl }
});

module.exports = {
    connection,
    DataTypes,
    testConnection: () => connection.authenticate().then(() => "OK").catch(error => {
        console.error(error);
        return error.toString();
    })
}