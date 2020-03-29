// Geração de ID único é isolada para que, caso seja utilizada em mais de um local no código, possa ser reutilizada e garantir a unicidade do ID.
const crypto = require('crypto');

module.exports = function generateUniqueId() {
    return crypto.randomBytes(4).toString('HEX');
}