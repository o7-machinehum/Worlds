## Purpose of this script. In the order of implementation.
# 1. Write to the fifo file which is echoed into the gameserver. Commands are...
#       /give <player> <itemstring> [<count> [<wear>]] and whatever else is here: https://wiki.minetest.net/Server_commands
# 2. Ensure players don't double deposit items. This is done with a <playername>.json file which records which items players have deposited.
# 3. (Future) Sign outgoing items. Meaning if a player picks up an items in the gameworld some WOR should be staked into it. It should be submitted to the BC.
#    this is done by checking the sqlite database that is maintained by the server. Only some items should be submitted.

import config
import json

class player:
    def __init__(self, player):
        self.name = player
        self.dir = root + self.name # Player's directory
        self.openDeposit()
        self.load()
    
    # This is the file the maintains a record of what's been deposited to
    # prevent a double spend.
    def openDeposit(self):
        with open(root + self.dir + '.json') as js:
            self.dp = json.load(js)

    # Load in all the files that are in the folder.
    def load(self):
        self.itemdir = self.dir + '/items'
        self.items = os.listdir(self.itemsdir)
    
    # Extract any new items that are in the folder but not on the deposit list.
    def extractNew(self):
        for items in self.items:
            if( 

def writeFifo(string):
    with open(fifo, "w") as text_file:
        text_file.write(string) 

def main():
    pl = os.listdir(root) # Get list of players in player dir
    while(True):
        if(pl != os.listdir(root)): # If there are new players in the directory.
            pl = os.listdir(root)
            for players is pl:
                # loop through and find out who is new.
         

        # if there is a new player, create an object for that player
        
        for players in pl:
            # Open the server object file for the player

            playerobj[x] = player(pl[x])
            x += 1

if__name__== "__main__"
    main()
