# SuperWorld
## Overview
The popular novel *Ready Player One* presented the idea of a completely open MMORPG world. In this world anyone can add sections and the possibilities are completely unbounded. It's possible to build psudo versions of this, like Minecraft or Teraria, but it is still highly limited in what can be done.

The main requirements of a world like this are as follows:

1. Completely open source protocol
2. Anyone should be able to write code that 'bolts' into the universe
3. There should be no central server or authority running the entire network
4. The network should maintain consensus on the state of game world 

## Consensus
The system values that the network must agree on are entirely depended on required fairness and desired gameplay. Some examples are: player location, player health, platers skills and level, player items etc...

Using conventional methods tracking things like this are trivial, a server maintains a secure connection with a player and the player pipes his actions in the server, the server then reacts. As our system aims to be decentralised, we require another method.

A blockchain could be used to maintain consensus in the universe. If the user wished to make an action, he cryptographically signs the action an submits this to the network, the network assembles all the players actions and puts them into the blockchain. All actions should have a deterministic result, so consensus is maintained

This method has two major problems.

1. Blockchains are typically slow
2. The chain size will grow too fast 

A completely alternate method will now be presented.

### Worlds
The idea of a world is a supernode that maintains consensus in it's domain, the important elements and tasks are listed below.

1. An IP address that it can be uniquely identified with
2. Eight adjacent neighbors, with eight adjacent IP addresses. These are set by the world, and considered to be trusted
3. Listening to players in the world, when the present actions into their Action Ledger
4. Recording the ALH (Action ledger hash) of players from the world they entered from and world they moved into

If a player wants to move from World 1 to World 2 there are some requirements

1. The player is currently in World 1
2. The player must present an action ledger from World 1 
3. The action ledger must match the hash, provided by World 1

### Action Ledgers
A players action ledger contains all the cryptographically signed actions that he wishes to commit in a world, the list in held in chronological order. When a player wants to commit an action, the player must sign the action and sent it to the world, if the action is legal, it is entered into the worlds action ledger for that player. Once the player moved to another world, the action ledger is hashed and sent to the other world.

### Action Ledger traceback
Does there need to be a way for each world to trace back a players actions until the inception of time?

### Trust
The system only works if the neighboring worlds have trust in each other. It's possible for neighboring worlds to have disagreements with each other. For instance, one world might introduce an item that other worlds consider to be too powerful, in this case the world can just neglect it's existence, any action presented into the action ledger would be considered an illegal action and not entered into the action ledger.

Worlds that have rules that are considered to be completely egregious can be neglected. As an example lets say world one borders world two, world two borders world three, but world one does not border world three. It's entirely possible that world one might 

## Outstanding Issues
- Supernode outage

