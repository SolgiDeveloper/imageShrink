const {app, BrowserWindow, Menu} = require('electron')
//set env
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production'
const isMac = process.env.NODE_ENV !== 'darwin'
const isWin = process.env.NODE_ENV !== 'win32'

let mainWindow
app.on('ready', ()=>{
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
  mainWindow = new BrowserWindow({
    title: 'ImageShrink',
    width: 500,
    height: 600,
    resizable: isDev,
    icon: './assets/icons/Icon_256x256.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  mainWindow.loadFile('./app/index.html')
})

const menu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        click: ()=> app.quit()
      }
    ]
  }
]


