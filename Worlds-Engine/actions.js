/* Blockchain Actions
    Example:
      const actions = require('./actions')
      actions.createItem("turnip", "Sword", "Weapon", "1.00 WOR")
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

options = {
  authorization: 'turnip@active',
  broadcast: true,
  sign: true
}

Eos = require('eosjs')

module.exports = {
  connectEndpoint: function(chainId, IP, PrivateKey){
    console.log('Chain ID: ' + chainId)
    console.log('IP: ' + IP)
    
    const config = {
    chainId: chainId, 
    keyProvider: [PrivateKey], 
    httpEndpoint: IP, 
    expireInSeconds: 60,
    broadcast: true,
    debug: true,
    verbose: false, // API activity
    sign: true
    }; 
  
  const eos = Eos().getInfo((error, info) => {
    console.log(error, info);
  });
  
  debugger; // <-- I want to break here 
  
  },

  createItem: function(name, item, itemClass, stake){
    eos.contract('wsc.code').then(wsccode => {wsccode.createitem(name, item, itemClass, stake, options)})
  }
}


