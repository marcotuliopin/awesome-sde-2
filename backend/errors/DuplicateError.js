class DuplicateError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'DuplicateError';
    }
}

module.exports = DuplicateError;