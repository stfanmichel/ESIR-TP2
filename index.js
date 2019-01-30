/*
    Page web : File info
*/

const http = require('http')
const fs = require('fs')
const debug = require('debug')('tp2-server')

const port = 8000

debug('Booting')

// Configure our HTTP server
const server = http.createServer((req, res) => {
    debug(`Request received ${req.method} ${req.url}`)
    const files = fs.readdirSync('.')
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify(files))
})

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(port)

// Server ready
debug(`Server running at http://127.0.0.1:${port}/`)