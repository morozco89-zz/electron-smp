const patientService = require('../services/patient-service')
const _ = require('lodash')
const path = require('path')
const url = require('url')

const controller = {
    findUserByEmail: (viewWindow) => {
        return (email) => {
            const patient = patientService.findByEmail(email)
            viewWindow.webContents.send('patient:found', patient)
        }
    }
}

module.exports = controller
