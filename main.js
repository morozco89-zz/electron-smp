const electron = require('electron')
const url = require('url')
const path = require('path')

// Controllers
const authController = require('./controllers/auth-controller')
const patientController = require('./controllers/patient-controller')
const ecgController = require('./controllers/ecg-controller')

const { app, BrowserWindow, Menu, ipcMain } = electron

let mainWindow;

// Create menu template
const mainMenuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: 'Add Item',
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit()
                }
            }
        ]
    }
]

// Listen for app to be ready
app.on('ready', () => {
    // Create new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/login.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Quit app when closed
    mainWindow.on('closed', () => {
        app.quit()
    })

    // Full screen
    //mainWindow.setFullScreen(true)

    // Routes
    ipcMain.on('user:login', authController.login(mainWindow))
    ipcMain.on('patient:find-by-email', patientController.findUserByEmail(mainWindow))
    ipcMain.on('ecg:start-reading', ecgController.start(mainWindow))
    ipcMain.on('ecg:stop-reading', ecgController.stop)

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)

    // Insert menu
    Menu.setApplicationMenu(mainMenu)
})

// If macOS add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({
        label: ''
    })
}

// Add developer tools item if not in production
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                },
            },
            {
                role: 'reload'
            }
        ]
    })
}
