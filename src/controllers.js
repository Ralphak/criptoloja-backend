const {
    cotacaoCripto,
    produto
}= require("./models");

exports.cotacaoCriptoController = {
    getCotacoes: async (req, res) => {
        try {
            let query = req.params.codCripto
                ? await cotacaoCripto.findByPk(req.params.codCripto.toUpperCase())
                : await cotacaoCripto.findAll();
            res.json(query);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.toString());
        }
    }
}

exports.produtoController = {
    getProdutos: async (req, res) => {
        try {
            let query = req.params.idProduto
                ? await produto.findByPk(req.params.idProduto)
                : await produto.findAll();
            res.json(query);
        } catch (err) {
            console.error(err);
            res.status(500).send(err.toString());
        }
    }
}
