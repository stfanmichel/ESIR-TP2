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
const server = http.createServer((req, res) => {
    debug(`Request received ${req.method} ${req.url}`)

    // Get file list and then the file properties with file fileProperties module
    fileList(path).then(fileList => {
        return fileProperties(path, fileList)
    }).then(result => {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify(result))
    }).catch(reason => {
        res.writeHead(404, {"Content-Type": "application/json"})
        res.end(JSON.stringify(reason))
    })
})

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(port)

// Server ready
debug(`Server running at http://127.0.0.1:${port}/`)