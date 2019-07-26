const path = require('path');

function nuxtContentfulModule() {
    this.addPlugin({
        src: path.resolve(__dirname, 'plugin.js'),
        fileName: 'nuxt-contentful.js',
    });
}
