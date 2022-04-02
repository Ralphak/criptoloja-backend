const axios = require("axios");
axios.defaults.baseURL = "http://localhost:5000";

describe("Clientes", () => {
    test("Atualizar cliente", () =>
        expect(axios.put("/clientes", {
            idCliente: 1,
            email: "teste@mail.com",
            nome: "Cliente Teste"
        })).resolves.toBeDefined()
    );
    test("Obter cliente por ID", () =>
        expect(axios.get("/clientes/1")).resolves.toBeDefined()
    );
    test("Obter cliente por email", () =>
        expect(axios.get("/clientes", {
            params: {
                email: "teste@mail.com"
            }
        })).resolves.toBeDefined()
    );
    test("Obter cliente retorna erro por não informar um parâmetro", () =>
        expect(axios.get("/clientes")).rejects.toThrow()
    );
});

describe("Produtos", () => {
    test("Atualizar produto", () =>
        expect(axios.put("/produtos", {
            idProduto: 1,
            nomeProduto: "Geladeira Frost Free",
            categoria: "Eletrodomésticos",
            precoReal: 2000
        })).resolves.toBeDefined()
    );
    test("Obter produto por ID", () =>
        expect(axios.get("/produtos/1")).resolves.toBeDefined()
    );
    test("Listar produtos", () =>
        expect(axios.get("/produtos")).resolves.toBeDefined()
    );
});

describe("Avaliações", () => {
    test("Enviar avaliação", () =>
        axios.post("/avaliacoes", {
            idCliente: 1,
            idProduto: 1,
            recomendado: true,
            descricao: "Ótimo!"
        }).then(response =>
            expect(response).toBeDefined()
        ).catch(error =>
            expect(error.response.status).toBe(409)
        )
    );
    test("Obter avaliações por cliente", () =>
        expect(axios.get("/avaliacoes/cliente/1")).resolves.toBeDefined()
    );
    test("Obter avaliações por produto", () =>
        expect(axios.get("/avaliacoes/produto/1")).resolves.toBeDefined()
    );
});

describe("Cotação de Criptomoedas", () => {
    test("Atualizar cotação", () =>
        expect(axios.put("/cotacoes", {
            codCripto: "TEST",
            nomeCripto: "Teste de Criptomoeda",
            cotacaoReal: 67.42
        })).resolves.toBeDefined()
    );
    test("Obter cotação por código", () =>
        expect(axios.get("/cotacoes/TEST")).resolves.toBeDefined()
    );
    test("Listar cotações", () =>
        expect(axios.get("/cotacoes")).resolves.toBeDefined()
    );
    test("Remover cotação", () =>
        expect(axios.delete("/cotacoes/TEST")).resolves.toBeDefined()
    );
});

describe("Endereços", () => {
    test("Atualizar endereço", () =>
        expect(axios.put("/enderecos", {
            idCliente: 1,
            cep: "20081-240",
            logradouro: "Praça Mauá",
            numero: 1,
            bairro: "Centro",
            cidade: "Rio de Janeiro",
            estado: "RJ",
        })).resolves.toBeDefined()
    );
    test("Obter endereço do cliente", () =>
        expect(axios.get("/enderecos/1")).resolves.toBeDefined()
    );
});

describe("Formas de Pagamento", () => {
    test("Cadastrar nova forma de pagamento", () =>
        axios.post("/pagamentos", {
            idPagamento: 1,
            nome: "Teste de Pagamento"
        }).then(response =>
            expect(response).toBeDefined()
        ).catch(error =>
            expect(error.response.status).toBe(409)
        )
    );
    test("Listar formas de pagamento", () =>
        expect(axios.get("/pagamentos")).resolves.toBeDefined()
    );
    test("Cliente atualiza dados de pagamento", () =>
        expect(axios.put("/pagamentos/cliente", {
            idCliente: 1,
            idPagamento: 1,
            dadosPagamento: {
                numero: 11223344,
                validade: "2030-03-14",
                nome: "TESTE CLIENTE DO PAGAMENTO"
            }
        })).resolves.toBeDefined()
    );
    test("Listar pagamentos do cliente", () =>
        expect(axios.get("/pagamentos/cliente/1")).resolves.toBeDefined()
    );
    test("Obter dados de um pagamento do cliente", () =>
        expect(axios.get("/pagamentos/1/cliente/1")).resolves.toBeDefined()
    );
    test("Remover forma de pagamento", () =>
        expect(axios.delete("/pagamentos/1")).resolves.toBeDefined()
    );
});

describe("Pedidos", () => {
    test("Registrar pedido", () =>
        axios.post("/pedidos", {
            numPedido: 1,
            dataPedido: new Date(),
            idCliente: 1,
            cepEnvio: "20081-240",
            enderecoEnvio: "Praça Mauá 1, Centro, Rio de Janeiro, RJ",
            moeda: "TEST",
            formaPagamento: "Teste de Pagamento",
            dadosPagamento: {
                numero: 11223344,
                validade: "2030-03-14",
                nome: "TESTE CLIENTE DO PAGAMENTO"
            },
            produtos: [{
                idProduto: 1,
                precoUnitario: 2000,
                quantidade: 3
            }]
        }).then(response =>
            expect(response).toBeDefined()
        ).catch(error =>
            expect(error.response.status).toBe(409)
        )
    );
    test("Listar pedidos do cliente", () =>
        expect(axios.get("/pedidos", {
            params: {
                email: "teste@mail.com"
            }
        })).resolves.toBeDefined()
    );
});
