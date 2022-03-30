const { connection } = require("./db");
const {
    avaliacao, cliente, cotacaoCripto, endereco, pagamento,
    pagamentoCliente, pedido, produto, produtoPedido
} = require("./models");
const utils = require("./utils");

exports.avaliacaoController = {
    getAvaliacoes: (req, res) => {
        let where = {};
        if (req.params.idCliente) where.idCliente = req.params.idCliente;
        else if (req.params.idProduto) where.idProduto = req.params.idProduto;
        else return res.status(400).send("Parâmetros de URL inválidos!");
        avaliacao.findAll({ where })
            .then(query => res.json(query))
            .catch(err => utils.logError(err, res));
    },
    postAvaliacoes: (req, res) => {
        avaliacao.create(req.body).then(done => res.json(done)).catch(err => utils.logError(err, res));
    }
}

exports.clienteController = {
    getCliente: async (req, res) => {
        try {
            if (req.params.idCliente) query = await cliente.findByPk(req.params.idCliente);
            else if (req.query.email) query = await cliente.findOne({ where: { email: req.query.email } });
            else return res.status(400).send("É necessário informar id ou email!");
            res.json(query);
        } catch (err) { utils.logError(err, res) }
    },
    putCliente: (req, res) => {
        cliente.upsert(req.body).then(done => res.json(done)).catch(err => utils.logError(err, res));
    }
}

exports.cotacaoCriptoController = {
    getCotacoes: async (req, res) => {
        try {
            let query = req.params.codCripto
                ? await cotacaoCripto.findByPk(req.params.codCripto.toUpperCase())
                : await cotacaoCripto.findAll();
            res.json(query);
        } catch (err) { utils.logError(err, res) }
    },
    putCotacoes: (req, res) => {
        cotacaoCripto.upsert(req.body).then(done => res.json(done)).catch(err => utils.logError(err, res));
    },
    deleteCotacoes: (req, res) => {
        cotacaoCripto.destroy({
            where: { codCripto: req.params.codCripto }
        }).then(done => res.json(done)).catch(err => utils.logError(err, res));
    }
}

exports.enderecoController = {
    getEnderecos: (req, res) => {
        if (!req.params.idCliente) return res.status(400).send("ID do cliente não informado!");
        endereco.findByPk(req.params.idCliente)
            .then(query => res.json(query))
            .catch(err => utils.logError(err, res));
    },
    putEnderecos: (req, res) => {
        endereco.upsert(req.body).then(done => res.json(done)).catch(err => utils.logError(err, res));
    }
}

exports.pagamentoController = {
    getPagamentos: (req, res) => {
        pagamento.findAll().then(query => res.json(query)).catch(err => utils.logError(err, res));
    },
    postPagamentos: (req, res) => {
        pagamento.create(req.body).then(done => res.json(done)).catch(err => utils.logError(err, res));
    },
    deletePagamentos: (req, res) => {
        pagamento.destroy({
            where: { idPagamento: req.params.idPagamento }
        }).then(done => res.json(done)).catch(err => utils.logError(err, res));
    }
}

exports.pagamentoClienteController = {
    getPagamentosCliente: async (req, res) => {
        try {
            let query = req.params.idPagamento
                ? await pagamentoCliente.findOne({
                    where: {
                        idCliente: req.params.idCliente,
                        idPagamento: req.params.idPagamento
                    }
                })
                : await pagamentoCliente.findAll({
                    attributes: { exclude: ["dadosPagamento"] },
                    where: { idCliente: req.params.idCliente }
                });
            res.json(query);
        } catch (err) { utils.logError(err, res) }
    },
    putPagamentosCliente: (req, res) => {
        pagamentoCliente.upsert(req.body).then(done => res.json(done)).catch(err => utils.logError(err, res));
    }
}

exports.pedidoController = {
    getPedidos: (req, res) => {
        let where = req.query,
            page = req.params.page - 1 || 0,
            limit = 25,
            offset = limit * page;
        pedido.findAll({
            include: {
                model: produtoPedido,
                as: "produtos",
                include: {
                    model: produto,
                    attributes: ["nomeProduto"]
                }
            }
        }, {
            where, limit, offset,
            order: [["numPedido", "DESC"]]
        }).then(query => res.json(query)).catch(err => utils.logError(err, res));
    },
    postPedidos: (req, res) => {
        connection.transaction(async transaction => {
            let pedidoNovo = await pedido.create(req.body, { transaction });
            let listaProdutos = req.body.produtos.map(p => {
                p.numPedido = pedidoNovo.dataValues.numPedido;
                return p;
            });
            await produtoPedido.bulkCreate(listaProdutos, { transaction });
            return {pedidoNovo, listaProdutos};
        }).then(done => res.json(done)).catch(err => utils.logError(err, res));
    }
}

exports.produtoController = {
    getProdutos: async (req, res) => {
        try {
            let query = req.params.idProduto
                ? await produto.findByPk(req.params.idProduto)
                : await produto.findAll();
            res.json(query);
        } catch (err) { utils.logError(err, res) }
    },
    putProdutos: (req, res) => {
        produto.upsert(req.body).then(done => res.json(done)).catch(err => utils.logError(err, res));
    }
}
