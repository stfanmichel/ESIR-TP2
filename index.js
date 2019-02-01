/*
    Page web : File info
*/

const http = require('http')
const debug = require('debug')('tp2-server')
const {fileProperties, fileList} = require('./lib/fileProperties')

const port = 8000
const path = './node_modules'

debug('Booting')

// Configure our HTTP server
const server = http.createServer(async(req, res) => {
    debug(`Request received ${req.method} ${req.url}`)

    try {
        // Get file list and then the file properties with file fileProperties module
        const fileArray = await fileList(path)
        const fileArrayWithProperties = await fileProperties(path, fileArray)

        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify(fileArrayWithProperties))
    } catch (exception) {
        debug(exception)
        res.writeHead(404, {"Content-Type": "application/json"})
        res.end(JSON.stringify(exception))
    }
})

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(port)

// Server ready
debug(`Server running at http://127.0.0.1:${port}/`)