module.exports = {
    ignoreNonLetter: function ignoreNonLetter(str) {
        return str ? str.replace(/[^a-zA-Z]/g, '').toLowerCase() : '';
    }
};
