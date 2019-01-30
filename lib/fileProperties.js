const fs = require('fs')
const debug = require('debug')('tp2-fileProperties')

const path = '.'

const fileProperties = (path) => {
    debug(`File properties of path ${path}`)
    const files = fs.readdirSync(path)

    const result = []
    files.forEach(file => {
        result.push({
            name: file,
            properties: fs.statSync(path + "/" + file)
        })
    })

    return result
}

exports.fileProperties = fileProperties