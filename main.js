const {app, BrowserWindow, Menu, globalShortcut} = require('electron')
//set env
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production'
const isMac = process.env.NODE_ENV !== 'darwin'
const isWin = process.env.NODE_ENV !== 'win32'

let mainWindow
let aboutWindow
app.on('ready', ()=>{
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)

  globalShortcut.register('CmdOrCtrl+R', ()=> mainWindow.reload())
  globalShortcut.register(isWin ? 'Ctrl+Shift+I': 'Command+Alt+I', ()=> mainWindow.toggleDevTools())
  mainWindow = new BrowserWindow({
    title: 'ImageShrink',
    width: isDev ? 800 : 500,
    height: 600,
    resizable: isDev,
    icon: './assets/icons/Icon_256x256.png',
    backgroundColor: 'green',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  if (isDev){
    mainWindow.webContents.openDevTools()
  }
  // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  mainWindow.loadFile('./app/index.html')
  mainWindow.on('closed', ()=> app.quit())
})
function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: 'About ImageShrink',
    width: 300,
    height: 300,
    resizable: false,
    icon: './assets/icons/Icon_256x256.png',
    backgroundColor: 'green',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  aboutWindow.loadFile('./app/about.html')
  aboutWindow.on('closed', ()=> aboutWindow = null)
}
const menu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: isWin ? 'Ctrl+W':'Command+W',
        click: ()=> app.quit()
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'About',
        click:() => createAboutWindow()
      }
    ]
  },
  ...(isDev ? [
      {
        label: 'Developer',
        submenu: [
          {role: 'reload'},
          {role: 'forcereload'},
          {type: 'separator'},
          {role: 'toggledevtools'},
        ]
      }
    ] : [])
]


