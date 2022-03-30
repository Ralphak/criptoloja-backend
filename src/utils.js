exports.logError = (err, res) => {
    console.error(err);
    return res.status(500).send(err.toString());
}