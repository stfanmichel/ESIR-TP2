/*
    Page web : File info
*/

const http = require('http')

let nbRequest = 0

// Configure our HTTP server
const server = http.createServer((req, res) => {
    // TODO

})

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000)

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/")