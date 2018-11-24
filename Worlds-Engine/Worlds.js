/*
Worlds.js
	- Worlds Engine. This is what's used to communicate with the WSC.
*/

const Eos = require('eosjs');
const sock = require('./socket')
const actions = require('./actions')
const repl = require('repl');

port = 43252;

sock.open(port) // Open socket

const msg = 'message';
repl.start('> ').context.act = actions;
