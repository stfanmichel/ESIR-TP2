const fs = require('fs').promises
const debug = require('debug')('tp2-fileProperties')
const async = require("async")

const path = '.'

const fileProperties = (path) => {
    debug(`File async properties of path ${path}`)
    const promesse = new Promise((resolve, reject) => {
        fs
            .readdir(path)
            .then(files => {
                // si OK
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
                            callback(err_fsstat, null)
                        })
                }, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            })
            .catch(reason => {
                debug(`Unable to get file list of ${path}`)
                // si KO
                reject(reason)
            })
    })
    return promesse
}

exports.fileProperties = fileProperties