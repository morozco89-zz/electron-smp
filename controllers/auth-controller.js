const authService = require('../services/auth-service')
const { session } = require('electron')
const URL = 'http://localhost'
const COOKIE_SESSION_NAME = 'patient'

const controller = {
    login: (viewWindow) => {
        return (e, user) => {
            try {
                const patient = authService.login(user.email, user.pass)
                session.defaultSession.cookies.set({
                    url: URL,
                    name: COOKIE_SESSION_NAME,
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
    logout: (viewWindow) => {
        return (e) => {
            session.defaultSession.cookies.remove(URL, COOKIE_SESSION_NAME)
                .then(() => {
                    viewWindow.webContents.send('logout:success')
                })
        }
    }
}

module.exports = controller
