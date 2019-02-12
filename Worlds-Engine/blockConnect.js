const actions = require('./actions')
const sock = require('./socket')
var fs = require('fs')
const ecc = require('eosjs-ecc')
const wc = require('./worldConnect')

var eos

var account = {
  pubKey : null,
  privKey : null,
  name : null,
	selectedName : null,
	balance : null
}

var selectedItem = {
  item : null,
  update : function(fname){
    item = JSON.parse(fs.readFileSync('items/' + fname));
	  document.getElementById("Item_Name").innerHTML = "Item Name: " + item.ItemName
	  document.getElementById("Item_Class").innerHTML = "Item Class: " + item.ItemClass
	  document.getElementById("Item_Nuance").innerHTML = "Item Nuance: " + item.Nuance
	  document.getElementById("Item_Owner").innerHTML = "Item Owner: " + item.Owner
	  document.getElementById("Item_OriginWorld").innerHTML = "Origin World: " + item.OriginWorld
	  document.getElementById("Item_GenesisTime").innerHTML = "Genesis Time: " + item.GenesisTime
	  document.getElementById("Item_Stake").innerHTML = "Stake: " + item.Stake
  },
  liquid : function(){
    actions.liquidItem(eos, item, account.selectedName)
  }
}

var socket = {
  execute: function(){
    eval(document.getElementById("SockCMD").value)
    document.getElementById("SockCMD").value = null
    var x = document.getElementById("SocketCommand");
    x.style.display = "none";
  },
  ignore: function(){
    document.getElementById("SockCMD").value = null
    var x = document.getElementById("SocketCommand");
    x.style.display = "none";
  }
}

// Exported Modules
module.exports = {
	act: function (cmd){
    var x = document.getElementById("SocketCommand");
    x.style.display = "block"; // Hide
    document.getElementById("SockCMD").value = cmd 
  },
  prove: function (data){
    return(ecc.sign(data, document.getElementById("PrivateKey").value))
  }
}

// Used to verify proof packages.
function verify(sig, data, pubkey){
  wc.send(ecc.verify(sig, data, pubkey).toString())
  }

function connect() {
  account.privKey = document.getElementById("PrivateKey").value
  account.pubKey = document.getElementById("PublicKey").value
  
  console.log('Unlocking Wallet and connect to endpoint!');
  sock.open(document.getElementById("world_port").value) // Open socket
  
  eos = actions.connectEndpoint(
    document.getElementById("ChainID").value, 
    document.getElementById("EndPoint").value, 
    account.privKey)

  eos.getKeyAccounts(account.pubKey).then(addName)
  }

function addName(result){
	account.name = result.account_names 
	
	var x = document.getElementById("Chars");
	
	for(i = 0 ; i < account.name.length ; i++){
		var option = document.createElement("option");
		option.text = account.name[i] 
		x.add(option)
	}
  updateChar()
}

function updateChar(){
	account.selectedName = document.getElementById("Chars").value
	eos.getCurrencyBalance('wsc.code', account.selectedName, 'WOR').then(function fun(result) {account.balance = result; updateHTML(result)})
}

function updateHTML(result){
	document.getElementById("Balance").innerHTML = "Balance: " + account.balance
}

function TransferWor(){
  to = document.getElementById("TransferTo").value
  amount = document.getElementById("TransferAmt").value
  memo = 'future shit'

  actions.TXwor(eos, account.selectedName, to, amount, memo) 
}

function createItem(){

  ItemName = document.getElementById("ItemName").value
  ItemClass = document.getElementById("ItemClass").value
  ItemStake = document.getElementById("ItemStake").value
  ItemNuance = document.getElementById("ItemNuance").value
  
  // TODO: Check to ensure the same item is not already made!!!
  if(account.balance < ItemStake){
    console.log('Insufficant Funds!')
    return(0)
  }
  console.log('Creating Item')
  actions.createItem(eos, account.selectedName, ItemName, ItemClass, ItemStake, ItemNuance) 
}

function deleteItem(){

  ItemHash = document.getElementById("ItemHash").value
  
  console.log('Deleting item' + ItemHash)
  actions.deleteItem(eos, account.selectedName, ItemHash) 
}

function loadItems(){
  files = fs.readdirSync('items')
  
  for(var i = 0 ; i < files.length ; i++){
    if(files[i] == 'placeholder'){
      // delete files[i]
      files.splice(i)
    }
  }
  
  // Remove all existing items
  var select = document.getElementById("Items_Select");
  var length = select.options.length;
  for (i = 0; i < length; i++) {
    select.options[i] = null;
  }

  var x = document.getElementById("Items_Select");
  for(i = 0 ; i < files.length ; i++){
		var option = document.createElement("option");
		option.text = files[i] 
		x.add(option)
	}
  
  selectedItem.update(files[0])
}
