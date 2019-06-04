const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const actions = require('./actions')
const ecc = require('eosjs-ecc')

var eos

var account = {
  pubKey : "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
  privKey : "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
  chainID : "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
  EndPoint : "http://192.168.10.35:8888" 
}

function connect() {
  console.log('Unlocking Wallet and connect to endpoint!');
  // sock.open(document.getElementById("world_port").value) // Open socket
  
  eos = actions.connectEndpoint(
    account.chainID, 
    account.EndPoint, 
    account.privKey
  )

  eos.getKeyAccounts(account.pubKey)
}

function verify(sig, data, pubkey){
  world.send(ecc.verify(sig, data, pubkey).toString())
}

// TODO: Create a whitelist / Blacklist.
function act (cmd){
    eval(cmd)
}

function processCmd(msg){
  console.log("Executing: " + msg)
  act(`${msg}`)
}

var world = {
  IP : null,
  outPort : 40000,
  inPort : 40001,
  open: function (port){
		server.on('error', (err) => {
			console.log(`server error:\n${err.stack}`);
			server.close();
		});

		server.on('message', (msg, rinfo) => {
			console.log('Got Message: ' + msg)
      processCmd(msg);
		});

		server.on('listening', () => {
			const address = server.address();
			console.log(`server listening ${address.address}:${address.port}`);
		});

    console.log("Binding to port: " + port)
		server.bind(port);
	},
  openOutgoing: function (port){
    outPort = port;
    const message = Buffer.from('Some bytes');
    client = dgram.createSocket('udp4');
  },
  send: function (msg){
    client.send(msg, outPort, 'localhost', (err) => {
      // client.close();
    });
  }
}

connect() // Connect to blockchain
world.open(world.outPort)
world.openOutgoing(world.inPort)

