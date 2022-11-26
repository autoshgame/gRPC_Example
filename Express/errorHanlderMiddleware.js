function globalExceptionHandler(err, req, res, next) {
    console.log(err);
    res.status(500).send("Server error");
} 

module.exports = {
    globalExceptionHandler,
}