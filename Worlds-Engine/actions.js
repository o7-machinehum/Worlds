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
var fs = require("fs");
var hash = require("js-sha256")

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

  createItem: function(eos, name, itemName, itemClass, stake, ItemNuance){

    options.authorization = name + '@active'
		eos.contract('wsc.code').then(wsccode => {wsccode.createitem(name, itemName, itemClass, ItemNuance, stake, options)})
    t = Math.floor((new Date() / 1000) / 3600);
   
    // Move all this hashing into a function or something
    var item = itemName + itemClass + ItemNuance + name + name + t.toString() + stake
    
    console.log(item)

    var hash_i = hash(item);
    console.log(hash_i) // Hash should match what's onchain
    
    fs.writeFile('items/' + hash_i.substring(0,5) + '-' + name + '-' + itemName + '-' + t.toString()  + '.json', JSON.stringify({'ItemName': itemName, 'ItemClass': itemClass, 'Nuance': ItemNuance, 'Owner': name, 'OriginWorld': name, 'GenesisTime': t.toString(), 'Stake': stake, 'Hash': hash_i }, null, 2), 'utf8', function(err){
      if(err) throw err;
      console.log('Written Item to File!')
    });
  }, 

  TXwor: function(eos, from, to, amount, memo){
    options.authorization = from + '@active'
		eos.contract('wsc.code').then(wsccode => {wsccode.transferwor(from, to, amount, memo, options)})
  },
  
  deleteItem: function(eos, name, hash){
    options.authorization = name + '@active'
		eos.contract('wsc.code').then(wsccode => {wsccode.deleteitem(name, hash, options)})
  },
  liquidItem: function(eos, item, name){
    options.authorization = name + '@active'
		eos.contract('wsc.code').then(wsccode => {wsccode.liquiditem({"tx_item":{"ItemName":item.ItemName, "ItemClass":item.ItemClass, "Nuance":item.Nuance,"Owner":item.Owner, "OriginWorld":item.OriginWorld, "GenesisTime":parseInt(item.GenesisTime), "Stake":item.Stake}}, options)})
  }
}
