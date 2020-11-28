const fs = require('fs')
const path = require('path')
const axios = require('../http/ecg-http')

let dataArray = [];
let cursor = 0;

const service = {
    init: (id) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, "..", "data", "ecg", `${id}.csv`), 'utf8', (err, data) => {
                if (err) {
                    console.log("Hubo algun error?", err)
                    return reject(err)
                }
                dataArray = data.split(",")
                return resolve()
            })
        })
    },
    read: () => {
        if (dataArray.length === 0) {
            return null
        }
        if (dataArray.length < cursor + 1) {
            cursor = 0
        }

        const reading = dataArray[cursor]
        cursor++
        return reading
    },
    persist: (patientReading) => {
        axios.post('/', patientReading).then(res => {
            // console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = service
