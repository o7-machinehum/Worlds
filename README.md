# SuperWorld
## Overview
The popular novel *Ready Player One* presented the idea of a completely open MMORPG world. In this world anyone can add sections and the possibilities are completely unbounded. It's possible to build psudo versions of this, like Minecraft or Teraria, but it is still highly limited in what can be done.

The main requirements of a world like this are as follows:

1. Completely open source protocol
2. Anyone should be able to write code that 'bolts' into the universe
3. There should be no central server or authority running the entire network
4. The network should maintain consensus on the state of game world 

## Consensus
The system variables that the network must agree on are depended on the required fairness and desired gameplay. Some examples are: player location, player health, platers skills and level or player items. It's trivial to solve this using conventional methods, a server maintains a secure connection with a player and the player pipes his actions in the server, the server then reacts, providing ground truth for the network.

A decentralised system will require a different approach. Blockchains present clear deficiencies for solving this problem, they are too slow, the chain would get too large and they required additional consensus protocols that are still in heavy development. 

A completely alternate consensus method will now be presented.

### Worlds
The idea of a world is a node that maintains consensus in it's domain, a world can be anyone that wants to host 

1. An IP address that it can be uniquely identified with
2. Four adjacent neighbors, with four adjacent IP addresses. These are set by the world, and considered to be trusted
3. Listening to players in the world, when the present actions into their Action Ledger
4. Recording the ALH (Action ledger hash) of players from the world they entered from and world they moved into

If a player wants to move from World 1 to World 2 there are some requirements

1. The player is currently in World 1
2. The player must present an action ledger from World 1 
3. The action ledger must match the hash, provided by World 1

### Action Ledgers
A players action ledger contains all the cryptographically signed actions that he wishes to commit in a world, the list in held in chronological order. When a player wants to commit an action, the player must sign the action and sent it to the world, if the action is legal, it is entered into the worlds action ledger for that player. Once the player moved to another world, the action ledger is hashed and sent to the other world.

### Trust
The system only works if the neighboring worlds have trust in each other. It's possible for neighboring worlds to have disagreements with each other. For instance, a neighboring world might introduce an item that other worlds consider to be too powerful, in this case the world can just neglect it's existence, any action presented into the action ledger would be considered an illegal action and not entered into the action ledger of the world for that player.

Worlds that have rules that are considered to be completely egregious can be neglected. As an example lets say world one borders world two, world two borders world three, but world one does not border world three. It's entirely possible that world one might not agree with the rules of world three. There are two ways of dealing with a dispute like this, either a world disconnect or Action Ledger Traceback. 

#### Action Ledger traceback
When a player enters a world, the world has the option to traceback the Action ledger of a player to either the last entry in that world, or the players genesis. A world may wish to trust the consensus of the adjacent world, but this is a security question to be answered by the world itself. If the world conducts an action ledger traceback, and the traceback contains actions in a world that are not considered canon by the world doing the audit, the rewards and actions committed in the offending world are neglected in the world doing the audit.

### World Disconnects
It's possible a world may issue a disconnect of an adjacent world, this means that players can no longer travel back and fourth through these worlds. If the player resided in the disconnected world this could leave the player stranded in the offending world. It would be logical for the world that issued the disconnect to accept the player back into the world in an earlier state before the player moved into the offending world. 

## Player Genesis
Worlds should accept new players and form their genesis, which is zeroing out everything. 

## Outstanding Issues
- World outage, if a world experiences an outage, this could leave players stranded. Especially in the case where worlds require an action ledger traceback. 
