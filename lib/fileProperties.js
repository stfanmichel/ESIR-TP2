const fs = require('fs')
const debug = require('debug')('tp2-fileProperties')
const async = require("async")

const path = '.'

const fileProperties = (path, callback) => {
    debug(`File async properties of path ${path}`)
    fs.readdir(path, (err, files) => {
        if (err) {
            callback(err)
        } else {
            async.reduce(files, [], (memo, file, callback) => {
                fs.stat(path + "/" + file, (err_fsstat, properties) => {
                    if (err_fsstat) {
                        debug(`Unable to get properties of ${file}`)
                        callback(err_fsstat, null)
                    } else {
                        memo.push({name: file, properties})
                        callback(null, memo)
                    }
                })
            }, (err, result) => {
                callback(err, result)
            })
        }
    })
}

exports.fileProperties = fileProperties