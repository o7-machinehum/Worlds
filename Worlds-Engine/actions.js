/* Blockchain Actions
    Example:
      const actions = require('./actions')
      actions.createItem("turnip", "Sword", "Weapon", "1.00 WOR")
*/

var options = {
  authorization: '',
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
    options.authorization = name + '@active'
		eos.contract('wsc.code').then(wsccode => {wsccode.createitem(name, item, itemClass, stake, options)})
    
    item.name = name
    item.itemClass = itemClass
    item.stake = stake
    
    setTimeout(function()
      {
        // Then grab the hash onchain, make the full item package and log it down. 
        // eos.getTableRows({code:'wsc.code', scope:'turnip', table:'itemproofs', json:true}).then(function(res){console.log(res)})

      });

  }, 

  TXwor: function(eos, from, to, amount, memo){
    options.authorization = from + '@active'
		eos.contract('wsc.code').then(wsccode => {wsccode.transferwor(from, to, amount, memo, options)})
  }
}
