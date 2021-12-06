const router = require("express").Router();

//Health check
router.get('/', (req, res)=>{
    res.send({
        hostname: req.headers.host,
        status: "OK"
    });
})

module.exports = router;