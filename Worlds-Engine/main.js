const {app, BrowserWindow} = require('electron')
const actions = require('./actions')
const sock = require('./socket')

let mainWindow

var nodeConsole = require('console');
var Myconsole = new nodeConsole.Console(process.stdout, process.stderr);

/* Replace console with special output*/
var console = {};
console.log = function(msg){
  Myconsole.log(msg)
};

function connect() {
  Key = document.getElementById("PrivateKey").value
  Port = document.getElementById("Port").value
  EndPoint= document.getElementById("EndPoint").value
  ChainID = document.getElementById("ChainID").value
  
  console.log('Unlocking Wallet and connect to endpoint!');
  
  sock.open(Port) // Open socket
  actions.connectEndpoint(ChainID, EndPoint, Key)
  
  }

function createItem(){

  ItemName = document.getElementById("ItemName").value
  ItemClass = document.getElementById("ItemClass").value
  ItemStake = document.getElementById("ItemStake").value
  
  console.log('Creating Item')
  actions.createItem('turnip', ItemName, ItemClass, ItemStake) 
}

function createWindow () {
  
  mainWindow = new BrowserWindow({width: 400, height: 800})

  mainWindow.loadFile('index.html')

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


