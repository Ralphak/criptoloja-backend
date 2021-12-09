const router = require("express").Router();
const checkJwt = require("express-oauth2-jwt-bearer").auth({
    audience: process.env.AUTH0_API + "/api/v2/",
    issuerBaseURL: process.env.AUTH0_API
});
const cotacaoCriptoController = require("./controllers/CotacaoCriptoController");

//Health check
router.get('/', async(req, res) => res.send({
    hostname: req.headers.host,
    status: "OK",
    dbStatus: await require("./db").testConnection()
}));

//Cotação de Criptomoedas
router.get("/cotacoes/:codCripto?", cotacaoCriptoController.getCotacoes);

module.exports = router;