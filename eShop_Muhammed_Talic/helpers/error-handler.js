












/*
function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({message: "Korisnik nije autorizovan!"})
    }
    if (err.name === 'ValidationError') {
        return res.status(401).json({message: err})
    }
    // default to 500 server error
    return res.status(500).json(err);
}

module.exports = errorHandler;*/
