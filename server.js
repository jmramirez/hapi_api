const Hapi = require('@hapi/hapi')
const routes = {}
routes.todo = require('./routes/todo')

const init = async () => {

    //create a server with a host and port
    const server = new Hapi.server({
        port: 8000,
        host: 'localhost'
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return h.response({ message: 'hello, world!!'})
        }
    })

    server.route(routes.todo)

    await server.register({
        plugin: require('@hapi/good'),
        options : {
            ops: {
                interval: 1000
            },
            reporters: {
                consoleReporters: [
                    {
                        module: '@hapi/good-console'
                    },
                    'stdout'
                ]
            }
        }
    })

    await server.start();
    console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1)
})

init()
