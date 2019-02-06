var fs = require('fs')
const nodeCmd = require('node-cmd');

var world = {
  IP : null,
  Port : null,
  Name : null,
  exe: null,
  enter: function(){
    IP = document.getElementById("world_ip").value 
    Port = document.getElementById("world_port").value 
    Name = document.getElementById("world_name").value 
    exe = document.getElementById("world_exe").value 
    
    console.log(IP + Port + Name)
  
    // Write the player info down into a file
    fs.writeFile('player/' + 'player.json', JSON.stringify({'Name': account.selectedName, 'proof': 'notMeow'}, null, 2), 'utf8', function(err){
      if(err) throw err;
      console.log('Written Item to File!')
    });
    
    nodeCmd.get(exe, (err, data, stderr) => console.log(data)); // Run the client 
  },
  start: function(){
    debugger
  }
}
