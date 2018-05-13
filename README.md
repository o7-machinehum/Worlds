# The Oasis

## Proof of Order
Poof of order.
	1. Actions are put chronologically into the block. What's to stop the player from re-arranging the block right before it was hashed and sent to the blockchain.
	2. Perhaps signed actions are signed and sent out to players within a certain grid distance. These actions can be assembled into everyone's personal blocks, signed and submitted to the blockchain.
		- I imagine this would get messy and redundent

- How does real time communication work ?
	- P2P TCP/IP messages?

Player 1
	- Location: [10, 15]

Player 2
	- Location:[11, 15]

## State machine
- Player 1 wants to move one position up
- He then signs this action sends the signed package to player 2, simply because they're in proximity.	
- Player 1 puts this action into his blockchain
- Player 2 receives this action and puts it into his blockchain
- When the next block comes around, both players hash/sign their current block and submit it to the main chain. Both players must have their entire chain visible using FTP or other.

### Prevent cheating
- There needs to be a way to incentivise people to protect against cheaters.

##
