class ErrorHandler {
    static handle(error, req, res, next) {
        const status = error.status || 500;

        console.error(error);

        res.status(status).json({
            message: error.message || 'Internal server error'
        });
    }
}

module.exports = ErrorHandler;
