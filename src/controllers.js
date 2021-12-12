const {
    cliente,
    cotacaoCripto,
    produto
} = require("./models");
const utils = require("./utils");

exports.clienteController = {
    getCliente: async (req, res) => {
        try {
            if (req.params.idCliente) query = await cliente.findByPk(req.params.idCliente);
            else if (req.query.email) query = await cliente.findOne({ where: { email: req.query.email } });
            else return res.status(400).send("É necessário informar id ou email!");
            res.json(query);
        } catch (err) { res.status(500).send(utils.logError(err)) }
    },
    postCliente: (req, res) => {
        cliente.create(req.body).then(done => res.json(done)).catch(err => res.status(500).send(utils.logError(err)))
    }
}

exports.cotacaoCriptoController = {
    getCotacoes: async (req, res) => {
        try {
            let query = req.params.codCripto
                ? await cotacaoCripto.findByPk(req.params.codCripto.toUpperCase())
                : await cotacaoCripto.findAll();
            res.json(query);
        } catch (err) { res.status(500).send(utils.logError(err)) }
    }
}

exports.produtoController = {
    getProdutos: async (req, res) => {
        try {
            let query = req.params.idProduto
                ? await produto.findByPk(req.params.idProduto)
                : await produto.findAll();
            res.json(query);
        } catch (err) { res.status(500).send(utils.logError(err)) }
    }
}
