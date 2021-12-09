const cotacaoCripto = require("../models/CotacaoCripto");

exports.getCotacoes = async (req, res) => {
    try {
        let cotacoes = req.params.codCripto
            ? await cotacaoCripto.findByPk(req.params.codCripto.toUpperCase())
            : await cotacaoCripto.findAll();
        res.json(cotacoes);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.toString());
    }
}