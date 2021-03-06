import packageInfo from '../../../package.json';

const checkHealthSchema = {
    tags: ['system'],
    response: {
        204: {
            description: 'Health check successfull',
            type: 'object'
        }
    }
};

const versionSchema = {
    tags: ['system'],
    response: {
        200: {
            description: 'scheduler version',
            type: 'object',
            properties: {
                version: { type: 'string' }
            }
        }
    }
};

export function buildAdminRoutes() {

    function checkHealth(request, reply) {
        reply.code(204).res.end();
    }

    async function version() {
        return { version: packageInfo.version };
    }

    return function(fastify, opts, next) {
        fastify.get('/check-health', { ...opts, ...{ logLevel: 'warn', schema: checkHealthSchema } }, checkHealth);
        fastify.get('/version', { ...opts, ...{ logLevel: 'warn', schema: versionSchema } }, version);
        next();
    };
}
