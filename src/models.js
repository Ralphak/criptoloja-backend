const { connection, DataTypes } = require("./db");

exports.avaliacao = connection.define("avaliacao", {
    idCliente: {
        field: "idcliente",
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    idProduto: {
        field: "idproduto",
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    recomendado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

exports.cliente = connection.define("cliente", {
    idCliente: {
        field: "idcliente",
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

exports.cotacaoCripto = connection.define("cotacaocripto", {
    codCripto: {
        field: "codcripto",
        type: DataTypes.STRING(5),
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

exports.endereco = connection.define("endereco", {
    idCliente: {
        field: "idcliente",
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    cep: {
        type: DataTypes.CHAR(9),
        allowNull: false
    },
    logradouro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    complemento: {
        type: DataTypes.STRING
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.CHAR(2),
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false
})

exports.pagamento = connection.define("pagamento", {
    idPagamento: {
        field: "idpagamento",
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

exports.pagamentoCliente = connection.define("pagamentocliente", {
    idCliente: {
        field: "idcliente",
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    idPagamento: {
        field: "idpagamento",
        type: DataTypes.SMALLINT,
        primaryKey: true
    },
    dadosPagamento: {
        field: "dadospagamento",
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

exports.pedido = connection.define("pedido", {
    numPedido: {
        field: "numpedido",
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    dataPedido: {
        field: "datapedido",
        type: DataTypes.DATE,
    },
    idCliente: {
        field: "idcliente",
        type: DataTypes.NUMBER,
        allowNull: false
    },
    cepEnvio: {
        field: "cepenvio",
        type: DataTypes.CHAR(9),
        allowNull: false
    },
    enderecoEnvio: {
        field: "enderecoenvio",
        type: DataTypes.TEXT,
        allowNull: false
    },
    moeda: {
        type: DataTypes.STRING(5)
    },
    formaPagamento: {
        field: "formapagamento",
        type: DataTypes.STRING,
        allowNull: false
    },
    dadosPagamento: {
        field: "dadospagamento",
        type: DataTypes.JSON,
        allowNull: false
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
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT
    },
    especificacoes: {
        type: DataTypes.JSON
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

exports.produtoPedido = connection.define("produtopedido", {
    numPedido: {
        field: "numpedido",
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    idProduto: {
        field: "idproduto",
        type: DataTypes.NUMBER,
        primaryKey: true
    },
    precoUnitario: {
        field: "precounitario",
        type: DataTypes.NUMBER(20, 8),
        allowNull: false,
        get() { return parseFloat(this.getDataValue("precoUnitario")) }
    },
    quantidade: {
        type: DataTypes.SMALLINT,
        defaultValue: 1
    }
}, {
    freezeTableName: true,
    timestamps: false
});

this.pedido.hasMany(this.produtoPedido, {as: "produtos", foreignKey: "numPedido"});

this.produtoPedido.belongsTo(this.produto, {foreignKey: "idProduto"});