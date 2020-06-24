const Hapi = require('@hapi/hapi')

const init = async () => {

    //create a server with a host and port
    const server = new Hapi.server({
        port: 8000,
        host: 'localhost'
    })

    await server.start();
    console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1)
})

init()
