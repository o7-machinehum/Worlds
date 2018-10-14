/* Item Structure
  - Just for testing..
*/
const item = {
  ItemName: 'Sword',
  ItemClass: 'Weapon',
  Owner: 'turnip',
  PreviousOwner:  '',
  OriginWorld: '',
  GenesisTime: '',
  TXtime: '',
  Stake: '',
}

Eos = require('eosjs')

const config = {
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
  keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'], 
  httpEndpoint: 'http://127.0.0.1:8888',
  expireInSeconds: 60,
  broadcast: true,
  debug: true,
  verbose: false, // API activity
  sign: true
};

options = {
  authorization: 'turnip@active',
  broadcast: true,
  sign: true
}

const eos = Eos(config);

eos.contract('wsc.code').then(wsccode => {wsccode.createitem("turnip", "Sword", "Weapon", "1.00 WOR", options)})
// const actions = eos.getActions('turnip')).actions;

// console.log(actions.map(a => a.action_trace));

/*Get account actions*/

/*
eos.contract('wsc.code').then(wsccode => {wsccode.createitem("turnip", "Sword", "Weapon", "1.00 WOR")})
- This doesn't work :-(

https://eosio.stackexchange.com/questions/1422/how-to-get-operations-history-of-account
  - This talks about how to get actions from an account.


*/
