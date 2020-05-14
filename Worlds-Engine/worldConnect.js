// This is responcible to connected to the worlds client
// Is has various commands for moving items into the game etc

var net = require('net');
var fs = require('fs')

var world = {
  // This function writes connection details to player/player.json and launches
  // the exe for the client. This is how a player should enter a world.
  enter: function(){
  console.log('Conecting');
    
    IP = document.getElementById("world_client_ip").value 
    Port = document.getElementById("world_client_port").value 
    
    var client = new net.Socket();
    
    // Time to get all your shit into the world
    files = fs.readdirSync('items')
    for(var i = 0 ; i < files.length ; i++) {
        if(files[i] == 'placeholder') {
            // delete files[i]
            files.splice(i)
        }
    }
    
    // Dump all the items over to the server meow.
    client.connect(Port, IP, function() {
        console.log('Connecting ' + IP + Port);
        for(i = 0 ; i < files.length ; i++) {
            item = fs.readFileSync('items/' + files[i]);
            client.write(item);
        }
    });
  }
}
