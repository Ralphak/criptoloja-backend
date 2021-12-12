exports.logError = (err) => {
    console.error(err);
    return err.toString();
}