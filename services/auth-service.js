const patients = require('../data/patients')
const _ = require('lodash')

const service = {
    login: (email, pass) => {
        const user = _.find(patients, (validUser) => {
            return validUser.email === email
        })

        if (_.isNil(user)) {
            throw "User does not exists"
        }

        if (user.pass !== pass) {
            throw "Invalid password"
        }

        return user
    }
}

module.exports = service
