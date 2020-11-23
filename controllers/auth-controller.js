const authService = require('../services/auth-service')
const { session } = require('electron')

const controller = {
    login: (viewWindow) => {
        return (e, user) => {
            try {
                const patient = authService.login(user.email, user.pass)
                session.defaultSession.cookies.set({
                    url: 'http://localhost',
                    name: 'patient',
                    value: JSON.stringify(patient)
                }).then(() => {
                    viewWindow.webContents.send('login:success')
                }).catch(err => {
                    console.log(err)
                    viewWindow.webContents.send('login:fail', err)
                })
            } catch (err) {
                console.log(err)
                viewWindow.webContents.send('login:fail', err)
            }
        }
    },
}

module.exports = controller
