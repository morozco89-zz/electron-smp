const patients = require('../data/patients')
const _ = require('lodash')

const service = {
    findById: (id) => {
        return  _.find(patients, p => p.id === id)
    },
    findByEmail: (email) => {
        return  _.find(patients, p => p.email === email)
    }
}

module.exports = service
