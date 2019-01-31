/* socket.js */

const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var bc = require('./blockConnect')

function processCmd(msg){
  bc.act(`${msg}`)
}

module.exports = {
	open: function (port){
		server.on('error', (err) => {
			console.log(`server error:\n${err.stack}`);
			server.close();
		});
		server.on('message', (msg, rinfo) => {
			processCmd(msg);
		});

		server.on('listening', () => {
			const address = server.address();
			console.log(`server listening ${address.address}:${address.port}`);
		});

		server.bind(port);
	}
}
