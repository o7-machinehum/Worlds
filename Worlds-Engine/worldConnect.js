// This is responcible to connected to the worlds client
// Is has various commands for moving items into the game etc

var net = require('net');

var world = {
  // This function writes connection details to player/player.json and launches
  // the exe for the client. This is how a player should enter a world.
  enter: function(){
  console.log('Conecting');
    
    IP = document.getElementById("world_client_ip").value 
    Port = document.getElementById("world_client_port").value 
    
    var client = new net.Socket();
    client.connect(Port, IP, function() {
        console.log('Connecting ' + IP + Port);
        client.write('Hello, server! Love, Client.');
    });
  }
}
