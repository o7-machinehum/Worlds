/* socket.js 
sending
  const message = Buffer.from('Some bytes');
  const client = dgram.createSocket('udp4');
  client.send(message, 41234, 'localhost', (err) => {
    client.close();
  });
*/

const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var bc = require('./blockConnect')

var client = null 
var outPort = null 

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
    },

    openOutgoing: function (port){
        outPort = port;
        const message = Buffer.from('Some bytes');
        client = dgram.createSocket('udp4');
    },

    send: function (msg){
        client.send(msg, outPort, 'localhost', (err) => {
            client.close();
        });
    }
}
