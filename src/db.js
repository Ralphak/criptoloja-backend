const { Sequelize, DataTypes } = require('sequelize');
const connection = new Sequelize(process.env.DATABASE_URL);

module.exports = {
    connection,
    DataTypes,
    testConnection: () => connection.authenticate().then(()=>"OK").catch(error => {
        console.error(error);
        return error.toString();
    })
}