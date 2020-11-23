const ecgService = require('../services/ecg-service')
const _ = require('lodash')
const FREQUENCY = 20
let reader;

const controller = {
    start: (viewWindow) => {
        return (e, id) => {
            if (_.isNil(!reader)) return

            ecgService.init(id)
                .then(() => {
                    reader = setInterval(() => {
                        const reading = ecgService.read()
                        viewWindow.webContents.send('ecg:read', reading)
                    }, FREQUENCY)
                })
                .catch(error => {
                    viewWindow.webContents.send('ecg:read-fail', error)
                })
        }
    },
    stop: () => {
        clearInterval(reader)
    }
}

module.exports = controller
