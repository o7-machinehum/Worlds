/* Blockchain Actions
    Example:
      const actions = require('./actions')
      actions.createItem("turnip", "Sword", "Weapon", "1.00 WOR")
*/

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
    
    var config = {
    chainId: chainId, 
    keyProvider: [PrivateKey], 
    httpEndpoint: IP, 
    expireInSeconds: 60,
    broadcast: true,
    debug: true,
    verbose: false, // API activity
    sign: true
    };

    console.log(config)
    return(Eos(config))
  
  },

  createItem: function(eos, name, item, itemClass, stake){
    eos.contract('wsc.code').then(wsccode => {wsccode.createitem(name, item, itemClass, stake, options)})
  }, 

  TXwor: function(eos, from, to, amount, memo){
    debugger
    eos.contract('wsc.code').then(wsccode => {wsccode.transferwor(from, to, amount, memo, options)})
  }
}
