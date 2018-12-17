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

function logItem(t, item, res){
  var i = 0;
  for(i=0 ; i < res.rows.length ; i++) { 
    if(res.rows[i].GenesisTime >= t){
      break;
    }
  };
  
  item.GenesisTime = res.rows[i].GenesisTime;
  item.hash = res.rows[i].itemHash;
  fs.writeFile('items/' + item.hash + '-' + item.name + '.json', JSON.stringify(item), 'utf8', function(err){
    if(err) throw err;
    console.log('Written Item to File!')
  });

}

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

  createItem: function(eos, name, itemName, itemClass, stake){
    tstart = Math.floor(new Date() / 1000);

    options.authorization = name + '@active'
		eos.contract('wsc.code').then(wsccode => {wsccode.createitem(name, itemName, itemClass, stake, options)})
   
    var item = {name:itemName, class:itemClass, owner:name, originWorld:name, stake:stake}

    setTimeout(function(item)
    { // Max of 1000 items for now, three second delay (this is a pretty hacky way of doing this) 
      eos.getTableRows({code:'wsc.code', scope:item.owner, table:'itemproofs', json:true, limit:1000}).then(logItem.bind(null, tstart, item))
    }, 3000, item);
  }, 

  TXwor: function(eos, from, to, amount, memo){
    options.authorization = from + '@active'
		eos.contract('wsc.code').then(wsccode => {wsccode.transferwor(from, to, amount, memo, options)})
  },
  
  deleteItem: function(eos, name, hash){
    options.authorization = name + '@active'
		eos.contract('wsc.code').then(wsccode => {wsccode.deleteitem(name, hash, options)})
  }
}
