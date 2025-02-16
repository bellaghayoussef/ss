const path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
    mode: 'production',
};
