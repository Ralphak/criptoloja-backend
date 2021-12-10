const { connection, DataTypes } = require("./db");

exports.cotacaoCripto = connection.define("cotacaocripto", {
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

exports.produto = connection.define("produto", {
    idProduto: {
        field: "idproduto",
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeProduto: {
        field: "nomeproduto",
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        field: "categoria",
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        field: "descricao",
        type: DataTypes.TEXT
    },
    especificacoes: {
        field: "especificacoes",
        type: DataTypes.JSON
    },
    quantidade: {
        field: "quantidade",
        type: DataTypes.SMALLINT,
    },
    precoReal: {
        field: "precoreal",
        type: DataTypes.NUMBER(20, 2),
        allowNull: false,
        get() { return parseFloat(this.getDataValue("precoReal")) }
    }
}, {
    freezeTableName: true,
    timestamps: false
})
