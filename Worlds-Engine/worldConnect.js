var fs = require('fs')
const nodeCmd = require('node-cmd');
const bc = require('./blockConnect')

var world = {
  IP : null,
  Port : null,
  Name : null,
  exe: null,
  enter: function(){
    /* 
      This function writes connection details to player/player.json and launches the exe for the
      client. This is how a player should enter a world.
    */
    IP = document.getElementById("world_ip").value 
    Port = document.getElementById("world_port").value 
    Name = document.getElementById("world_name").value 
    exe = document.getElementById("world_exe").value 
    
    console.log(IP + Port + Name)
    
    t = Math.floor(new Date());
    data = t + account.selectedName;

    // Write the player info down into a file
    fs.writeFile('player/' + 'player.json', JSON.stringify({'Name': account.selectedName, 'PubKey': account.pubKey, 'Data': data, 'Proof': bc.prove(data), 'Address': IP, 'Port': Port }, null, 2), 'utf8', function(err){
      if(err) throw err;
      console.log('Written Proof to File!')
    });
    
    nodeCmd.get(exe, (err, data, stderr) => console.log(data)); // Run the client 
    sock.openOutgoing(document.getElementById("world_Outport").value) // Open socket
  }
}

module.exports = {
  send: function(msg){
    sock.send(msg)
  }
}
