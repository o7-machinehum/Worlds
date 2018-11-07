/*
Worlds.js
	- Worlds Engine. This is what's used to communicate with the WSC.
*/

const Eos = require('eosjs');
const dgram = require('dgram');
const sock = require('./socket')

port = 43252;

sock.open(port) // Open socket

