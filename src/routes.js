const router = require("express").Router();
const {
    avaliacaoController, clienteController, cotacaoCriptoController,
    enderecoController, pedidoController, produtoController,
    pagamentoController, pagamentoClienteController
} = require("./controllers");
const checkJwt = process.argv.includes("run-tests")
    ? (req, res, next) => next()
    : require("express-oauth2-jwt-bearer").auth({
        audience: process.env.AUTH0_API + "/api/v2/",
        issuerBaseURL: process.env.AUTH0_API
    });

//Health check
router.get('/', async (req, res) => res.json({
    hostname: req.headers.host,
    status: "OK",
    dbStatus: await require("./db").testConnection()
}));

//Avaliações
router.get("/avaliacoes/cliente/:idCliente", checkJwt, avaliacaoController.getAvaliacoes);
router.get("/avaliacoes/produto/:idProduto", avaliacaoController.getAvaliacoes);
router.post("/avaliacoes", checkJwt, avaliacaoController.postAvaliacoes);

//Clientes
router.get("/clientes/:idCliente?", checkJwt, clienteController.getCliente);
router.put("/clientes", checkJwt, clienteController.putCliente);

//Cotação de Criptomoedas
router.get("/cotacoes/:codCripto?", cotacaoCriptoController.getCotacoes);
router.put("/cotacoes", checkJwt, cotacaoCriptoController.putCotacoes);
router.delete("/cotacoes/:codCripto", checkJwt, cotacaoCriptoController.deleteCotacoes);

//Endereços
router.get("/enderecos/:idCliente", checkJwt, enderecoController.getEnderecos);
router.put("/enderecos", checkJwt, enderecoController.putEnderecos);

//Pagamentos Aceitos
router.get("/pagamentos", pagamentoController.getPagamentos);
router.post("/pagamentos", checkJwt, pagamentoController.postPagamentos);
router.delete("/pagamentos/:idPagamento", checkJwt, pagamentoController.deletePagamentos);

//Formas de pagamento dos clientes
router.get("/pagamentos/cliente/:idCliente", checkJwt, pagamentoClienteController.getPagamentosCliente);
router.get("/pagamentos/:idPagamento/cliente/:idCliente", checkJwt, pagamentoClienteController.getPagamentosCliente);
router.put("/pagamentos/cliente", checkJwt, pagamentoClienteController.putPagamentosCliente);

//Pedidos
router.get("/pedidos/:page?", checkJwt, pedidoController.getPedidos);
router.post("/pedidos", checkJwt, pedidoController.postPedidos);

//Produtos
router.get("/produtos/:idProduto?", produtoController.getProdutos);
router.put("/produtos", checkJwt, produtoController.putProdutos);

module.exports = router;