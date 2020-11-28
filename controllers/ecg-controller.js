const session = require('electron').session
const ecgService = require('../services/ecg-service')
const _ = require('lodash')
const FREQUENCY = 20
let reader;
let patient

const controller = {
    start: (viewWindow) => {
        return () => {
            if (_.isNil(!reader)) return

            session.defaultSession.cookies.get({name: 'patient'})
                .then(patientCookie => {
                    patient = JSON.parse(patientCookie[0].value)
                    return
                })
                .then(() => {
                    return ecgService.init(patient.ecg)
                })
                .then(() => {
                    reader = setInterval(() => {
                        const reading = ecgService.read()
                        ecgService.persist({
                            patient: patient.uid,
                            reading
                        })
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
