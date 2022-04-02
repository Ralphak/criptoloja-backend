exports.logError = (err, res) => {
    console.error(err);
    let statusCode = 500;
    if(err.name == "SequelizeUniqueConstraintError")
        statusCode = 409;
    return res.status(statusCode).send(err.toString());
}