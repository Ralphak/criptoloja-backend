const router = require("express").Router();
const {
    carrinhoController,
    clienteController,
    cotacaoCriptoController,
    produtoController
} = require("./controllers");
const checkJwt = require("express-oauth2-jwt-bearer").auth({
    audience: process.env.AUTH0_API + "/api/v2/",
    issuerBaseURL: process.env.AUTH0_API
});

//Health check
router.get('/', async (req, res) => res.json({
    hostname: req.headers.host,
    status: "OK",
    dbStatus: await require("./db").testConnection()
}));

//Carrinho
router.get("/carrinho/:idCliente", checkJwt, carrinhoController.listarCarrinho);
router.put("/carrinho/", checkJwt, carrinhoController.adicionarCarrinho);
router.delete("/carrinho/", checkJwt, carrinhoController.removerCarrinho);

//Clientes
router.get("/clientes/:idCliente?", checkJwt, clienteController.getCliente);
router.post("/clientes/", checkJwt, clienteController.postCliente);

//Cotação de Criptomoedas
router.get("/cotacoes/:codCripto?", cotacaoCriptoController.getCotacoes);

//Produtos
router.get("/produtos/:idProduto?", produtoController.getProdutos);

module.exports = router;