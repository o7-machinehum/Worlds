/* Item Structure
  - Just for testing..
*/
Item.ItemName = 'Sword'
Item.ItemClass = 'Weapon'
Item.Owner = 'turnip'
Item.PreviousOwner = ''
Item.OriginWorld = ''
Item.GenesisTime = ''
Item.TXtime = ''
Item.Stake =  ''

function CreateItem(eos){
  const actions = (await eos.getActions('turnip')).actions;
  console.log(actions.map(a => a.action_trace));
}

Eos = require('eosjs')

// Private key or keys (array) provided statically or by way of a function.
// For multiple keys, the get_required_keys API is used (more on that below).
keyProvider = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'

const config = {
  chainId: null, // 32 byte (64 char) hex string
  keyProvider: ['PrivateKeys...'], // WIF string or array of keys..
  httpEndpoint: 'http://127.0.0.1:8888',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
};

const eos = Eos(config);

CreateItem(eos);

/*Get account actions*/

/*
eos.contract('wsc.code').then(wsccode => {wsccode.createitem("turnip", "Sword", "Weapon", "1.00 WOR")})
- This doesn't work :-(

https://eosio.stackexchange.com/questions/1422/how-to-get-operations-history-of-account
  - This talks about how to get actions from an account.


*/
