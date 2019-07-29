const path = require('path');

function nuxtentfulModule() {
    this.addPlugin({
        src: path.resolve(__dirname, 'plugin.js'),
        fileName: 'nuxtentful.js',
    });
}

module.exports = nuxtentfulModule;
module.exports.meta = require('../package.json');
