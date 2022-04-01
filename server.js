const fs = require("fs");
if (fs.existsSync(".env")) require("dotenv").config();

const app = require("express")();
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