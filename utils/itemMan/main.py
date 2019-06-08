## Purpose of this script. In the order of implementation.
# 1. Write to the fifo file which is echoed into the gameserver. Commands are...
#       /give <player> <itemstring> [<count> [<wear>]] and whatever else is here: https://wiki.minetest.net/Server_commands
# 2. Ensure players don't double deposit items. This is done with a <playername>.json file which records which items players have deposited.
# 3. (Future) Sign outgoing items. Meaning if a player picks up an items in the gameworld some WOR should be staked into it. It should be submitted to the BC.
#    this is done by checking the sqlite database that is maintained by the server. Only some items should be submitted.

import config as cfg
import json
import pdb
import sys

def writeFifo(string):
    with open(cfg.fifo, "w") as text_file:
        text_file.write(string) 

class Item:
    def __init__(self, path, item):
        with open(sys.argv[1] + sys.argv[2]) as json_file:  
            self.item = json.load(json_file)
        if(self.Verify() == False):
            return
        self.name = str(self.item['Owner'])
        self.item = str(self.item['ItemName'])
        self.Translate() # Translate the item into something minetest cares about
        self.giveItem() # Give the item to the player.
    
    # This function takes in sel
    def Translate(self):
        self.itemOut = 'default:torch' 

    def Verify(self):
        print('Right Here make sure the Items is onchain')
        return(True) # But right now we cheat.
    
    def giveItem(self):
        writeFifo('/give ' + self.name + ' ' + self.itemOut + '\r') # /give turnip default:torch    

if __name__ == '__main__':
    it = Item(sys.argv[1], sys.argv[2])
