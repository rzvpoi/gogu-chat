const { app, BrowserWindow, Tray, Menu, nativeImage, dialog, HandlerDetails, shell, ipcMain, IpcMainEvent } = require('electron');
const {is} = require('electron-util');
const path = require('path')

let mainWindow;


function createWindow() {
  mainWindow = new BrowserWindow({
    icon:  nativeImage.createFromPath(path.join(app.getAppPath(), '/build/icons/256.png')),
    minHeight: 600,
    minWidth: 800,
    center: true,
    title: 'Gogu Chat',
  });

  
  // Load your website or local HTML file
  mainWindow.loadURL('https://mail.google.com/chat/u/0/');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' } //the link wont open in the app window
  });

  ipcMain.on('notificationClicked', (event = IpcMainEvent) => {

    if (!mainWindow.isVisible() || !mainWindow.isFocused()) {
      mainWindow.show()
    }

  });
}
const image = nativeImage.createFromPath(app.getAppPath() + '/build/icons/icon.icns');
app.dock.setIcon(image);

let tray;
app.whenReady().then(() => {
  const icon = nativeImage.createFromPath(app.getAppPath()+ '/build/icons/16.png')
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Toggle Show/Hide',
      click: handleIconClick
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click: () => {
        // The running webpage can prevent the app from quiting via window.onbeforeunload handler
        // So lets use exit() instead of quit()
        app.exit()
      }
    }
  ])
  tray.setToolTip('Gogu Chat');
  tray.setContextMenu(contextMenu)
});

const handleIconClick = () => {
  let shouldHide;

  if (is.windows) {
    shouldHide = mainWindow.isVisible() || mainWindow.isFocused();
  } else {
    shouldHide = mainWindow.isVisible() && mainWindow.isFocused();
  }
  //const shouldHide = is.windows ? (window.isVisible() || window.isFocused()) : (window.isVisible() && window.isFocused());

  if (shouldHide) {
    if (is.macos) {
      app.hide()
    } else {
      mainWindow.hide()
    }
  } else {
    mainWindow.show()
  }mainWindow
}




app.whenReady().then(createWindow);



app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});



