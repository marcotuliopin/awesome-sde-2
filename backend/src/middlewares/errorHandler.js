const { JsonWebTokenError } = require('jsonwebtoken');
const NotAuthorizedError = require('../../errors/NotAuthorizedError.js');
const InvalidParamError = require('../../errors/InvalidParamError');
const QueryError = require('../../errors/QueryError');
const httpStatusCodes = require('../utils/constants/httpStatusCodes');
const { UniqueConstraintError } = require('sequelize');

function errorHandler(error, req, res) {
    let message = error.message || "Internal server error";
    let status = httpStatusCodes.INTERNAL_SERVER_ERROR;

    if (error instanceof JsonWebTokenError ||
        error instanceof NotAuthorizedError) {
        status = httpStatusCodes.FORBIDDEN;
    }

    if (error instanceof InvalidParamError ||
        error instanceof QueryError ||
        error instanceof UniqueConstraintError) {
        status = httpStatusCodes.BAD_REQUEST;
    }

    console.error("Erro capturado:", error);
    res.status(status).json({ message });
}

module.exports = errorHandler;
