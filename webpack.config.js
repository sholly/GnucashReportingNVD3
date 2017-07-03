var path = require('path');
module.exports = {
    entry: ['./src/index.js', './src/expenses.js', './src/utils.js', './src/config.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};