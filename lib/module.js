const path = require('path');

function nuxtentfulModule() {
    this.addPlugin({
        src: path.resolve(__dirname, 'plugin.js'),
        fileName: 'nuxtentful.js',
    });

    this.addPlugin({
        src: path.resolve(__dirname, 'contentful-autoloader.js'),
        fileName: 'contentful-autoloader.js',
    });
}

module.exports = nuxtentfulModule;
module.exports.meta = require('../package.json');
