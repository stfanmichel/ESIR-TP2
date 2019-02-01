const fs = require('fs').promises
const debug = require('debug')('tp2-fileProperties')
const async = require("async")

// On notera que cette fonction n'a pas une plus value énorme...
const fileList = (path) => {
    debug(`File async properties of path ${path}`)
    return fs.readdir(path)
}

const fileProperties = (path, files) => {
    debug(`File async properties of fileArray`)

    const promesse = new Promise((resolve, reject) => {
        debug(`Found ${files.length} files in path ${path}`)

        async.reduce(files, [], (memo, file, callback) => {
            fs
                .stat(path + "/" + file)
                .then(properties => {
                    memo.push({name: file, properties})
                    callback(null, memo)
                })
                .catch(reason => {
                    debug(`Unable to get properties of ${file}`)
                    callback(reason, null)
                })
        }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
    return promesse
}

exports.fileProperties = fileProperties
exports.fileList = fileList