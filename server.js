const app = require("express")();

app.use(require("./src/routes"));

app.listen(process.env.PORT || 5000);