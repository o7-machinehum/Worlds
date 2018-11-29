const {app, BrowserWindow} = require('electron')
const actions = require('./actions')
const sock = require('./socket')
// const preact = require('preact')

let mainWindow

/*
var nodeConsole = require('console');
var Myconsole = new nodeConsole.Console(process.stdout, process.stderr);

/* Replace console with special output
var console = {};
console.log = function(msg){
  Myconsole.log(msg)
};
*/

var eos
 
var account = {
  pubKey : null,
  privKey : null,
  name : null
}

// const element = <h1>Hello, {formatName(account.name)}!</h1>;

function connect() {
  account.privKey = document.getElementById("PrivateKey").value
  account.pubKey = document.getElementById("PublicKey").value
  Port = document.getElementById("Port").value
  EndPoint= document.getElementById("EndPoint").value
  ChainID = document.getElementById("ChainID").value
  
  console.log('Unlocking Wallet and connect to endpoint!');
  
  sock.open(Port) // Open socket
  eos = actions.connectEndpoint(ChainID, EndPoint, account.privKey)
  // eos.getKeyAccounts(account.pubKey).then(result => account.name = result.account_names)

  // preact.render(element, document.getElementById('chars'));
  }

function createItem(){

  ItemName = document.getElementById("ItemName").value
  ItemClass = document.getElementById("ItemClass").value
  ItemStake = document.getElementById("ItemStake").value
  
  console.log('Creating Item')
  actions.createItem(eos, 'turnip', ItemName, ItemClass, ItemStake) 
}

function createWindow () {
  
  mainWindow = new BrowserWindow({width: 400, height: 800})

  mainWindow.loadFile('index.html')

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

