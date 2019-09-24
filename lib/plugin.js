// ./plugins/contentful.js
const contentful = require('contentful');

export default ({ app, error }) => {
    // Set the function directly on the context.app object
    app.contentful = contentful.createClient({
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
    });

    /**
     * Do a contentful fetch
     *
     * @param {Object} data
     * @param {Object} additionalData
     *
     * @returns {Promise<any>}
     */
    const getPage = async(data, additionalData) => {
        try {
            const { items } = await app.contentful.getEntries({
                ...data,
                include: 10,
            });
        } catch (e) {
            return generateBadRequestError(e.response.status);
        }

        if (items.length) {
            return items[0].fields;
        }

        if (!additionalData.failSilently) {
            return error({ statusCode: 404 });
        }
    };

    /**
     * Generate error if Contentful SDK throws error.
     *
     * @param {int} statusCode
     */
    const generateBadRequestError = (statusCode) => {
        return error({
            statusCode: statusCode,
            message: statusCode + ' Request Failed. '
                + 'Ensure that the Content Model '
                + 'with this slug exists in your Contentful space.',
        });
    };

    app.getContentfulPage = async({ ctxParams, ...additionalData}) => {
        const type = typeof ctxParams.slug === 'undefined'
            ? process.env.CTF_PAGE_CONTENT_MODEL
            : ctxParams.content_type;
        
        const slug = typeof ctxParams.slug === 'undefined'
            ? contentType
            : ctxParams.slug;
        
        return await getPage({
            content_type: type,
            'fields.slug[in]': slug,
        }, additionalData);
    };
};
