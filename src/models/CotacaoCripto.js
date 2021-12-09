const { connection, DataTypes } = require("../db");

module.exports = connection.define("cotacaocripto", {
    codCripto: {
        field: "codcripto",
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true
    },
    nomeCripto: {
        field: "nomecripto",
        type: DataTypes.STRING,
        allowNull: false
    },
    cotacaoReal: {
        field: "cotacaoreal",
        type: DataTypes.NUMBER(20, 2),
        allowNull: false,
        get() { return parseFloat(this.getDataValue("cotacaoReal")) }
    }
}, {
    freezeTableName: true,
    timestamps: false
})