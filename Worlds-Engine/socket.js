/* socket.js */

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

function processCmd(msg){
	console.log(`Processing CMD: ${msg} `);
	// Then parse and process the command
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
