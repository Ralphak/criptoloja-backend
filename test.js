const axios = require("axios");
axios.defaults.baseURL = "http://localhost:5000";

describe("Clientes", () => {
    test("Obter cliente por ID", () =>
        expect(axios.get("/clientes/1")).resolves.toBeDefined()
    )
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