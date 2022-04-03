const fs = require("fs");
if (fs.existsSync(".env")) require("dotenv").config();

const app = require("express")();
const cors = require("cors");
app.use(cors({
    origin: ["https://criptoloja.herokuapp.com", "http://localhost:3000", "http://192.168.0.3:3000"]
}));
app.use(require("body-parser").json());
app.use(require("./src/routes"));

app.listen(process.env.PORT || 5000, async() => {
    if (process.argv.includes("run-tests")){
        await require("jest").run([
            "test.js",
            "--detectOpenHandles",
            "--reporters=jest-html-reporter"
        ]);
        process.exit();
    }
});