const electron = require('electron');

const app = electron.app;
const Menu = electron.Menu;

const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;
let settingsWindow;

const openDevTools = () => mainWindow.webContents.openDevTools();

const createSettingsWindow = () => {
  settingsWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 500,
    height: 340,
    resizable: false,
  });

  settingsWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/settings.html'),
    protocol: 'file:',
    slashes: true,
  }));

  settingsWindow.once('ready-to-show', () => {
    settingsWindow.show();
  });

  settingsWindow.on('closed', () => {
    settingsWindow = null;
    mainWindow.webContents.reload();
  });
};

global.createSettingsWindow = createSettingsWindow;

const createGameWindow = () => {
  const template = [
    {
      label: app.getName(),
      submenu: [
        {
          label: 'Instellingen',
          click: createSettingsWindow,
        },
        { type: 'separator' },
        { role: 'hide', label: 'Verberg' },
        { role: 'unhide', label: 'Toon' },
        { type: 'separator' },
        { role: 'quit', label: 'Sluit' },
      ],
    },
    {
      label: 'Wijzig',
      submenu: [
        { role: 'undo', label: 'Herstel' },
        { role: 'redo', label: 'Opnieuw' },
        { type: 'separator' },
        { role: 'cut', label: 'Knip' },
        { role: 'copy', label: 'Kopieer' },
        { role: 'paste', labe: 'Plak' },
        { role: 'pasteandmatchstyle', label: 'Plak en pas stijl aan' },
        { role: 'delete', label: 'Verwijder' },
        { role: 'selectall', label: 'Selecteer alles' },
      ],
    },
    {
      label: 'Weergave',
      submenu: [
        { role: 'reload', label: 'Herlaad' },
        { role: 'forcereload', label: 'Forceer Herlaad' },
        { type: 'separator' },
        {
          label: 'Open Console',
          click: openDevTools,
        },
      ],
    },
    {
      role: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            require('electron').shell.openExternal('https://electron.atom.io');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({ width: 1920, height: 1080 });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', () => {
  app.setName('ChopChop');
  createGameWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createGameWindow();
  }
});
