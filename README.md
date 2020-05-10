# Worlds

<img src="Graphics/Header.png" alt="drawing" width="1000"/>

[YouTube Demo Here](https://www.youtube.com/watch?v=OrOZVr-j92A&t) <br>
[YouTube Explanation Here](https://www.youtube.com/watch?v=wfqsvlMFGHs&t)

Worlds is an open protocol designed to manage the economic and game theoretical components of a distributed MMO. This repository is focused on implementing the minimum dependencies required for developers to get up and running. For more detailed info please read the paper [here](https://github.com/Machine-Hum/Worlds/blob/master/Worlds-Whitepaper/whitepaper.pdf). This repository contains three main components.

* The Worlds Whitepaper
* The Worlds Engine
* The World Smart Contract

## Getting Started
First you want to source the enviornment.
```bash
source source_env.sh
```

Go ahead and create a wallet. 
```bash
wor_create_wallet
```

This will give you password, set up an init file to be called by other scripts.
Replace <PW>, <Pub> below with your password and pubkey. Keep in mind this is just
for development, do not do something like this with actual credentials.
```bash
echo "EOS_PW=<PW>" >> scripts/wor_init
echo "EOS_PUB=<Pub>" >> scripts/wor_init
wor_init
```

Run the chain
```bash
wor_run_chain
```

Unlock your wallet and Create account. If cleos asked you to unlock your wallet,
use this unlock wallet script.
```bash
wor_unlock_wallet
wor_run_chain
```

## Worlds Smart Contract 
The Worlds Smart Contact (WSC) is an EOS contract that is responsible for
managing player assets and WOR. WOR is a token that can be staked against items
and used as a means of currency. The contract is still under development and
subject to change!

### Building / Deploying
```bash
cd Worlds-Smart-Contract/  
make
make deploy
```

## Running the client
```bash
cd ~/Worlds/Worlds-Engine
npm start
```

### Dependencies
The WSC is build using eosio.cdt 1.3+
* [eosio](https://github.com/EOSIO/eos)
* [eosio.cdt](https://github.com/EOSIO/eosio.cdt)

## Scripting
Various simple scripts have been written to test the WSC. Before running them be
sure to open them and change the required fields depending on your account names
and application.

### Creating / Issuing Tokens
```bash
cd Worlds-Smart-Contract/scripts
./Tokens/createTokens.sh
./Tokens/issueTokens.sh
```
### Create Items
```bash
cd Worlds-Smart-Contract/scripts 
./Items/createItem.sh
```

### Transfer Items
Note that there is a hash required.
```bash
./Items/transferItem.sh
```

### Liquidate Items
```bash
./Items/liquidItem.sh
```

## Worlds Client (Worlds.js)
The worlds client is wallet that enables players to view, create, trade and liquidate items, exp and WOR. The worlds client uses eosjs to call the WSC. It hosts a simple UDP server that will accept commands from the game client. It is also possible to manage game assets directly from the wallet. Please note the wallet is in beta!

Running the wallet
```bash
cd Worlds/Worlds-Engine
npm install
npm start
```

## Worlds Server
It is possible for anyone to host a Worlds server and allow players to connect. There is a specific server / client state machine that must be followed to keep things consistent. Sections marked in bold are handled by the Engine itself, meaning developers do not have to worry about these. When the player connects the following sequence takes place...

1. *SS:* The game server establishes a socket to the Worlds Engine on the serverside. This is used to pipe data back and fourth.
2. *CS:* **The Worlds Engine launches the game client, as commanded by the player**
3. *SS/CS:* Communication is opened between the game client and the game server. This can be any protocol and is determined by the developer.
4. *CS:* **The Worlds Engine generates a proof package and writes the file to player/player.json on the client side**
5. *CS/SS:* The game client sends the json serialized object from client to server.
6. *SS:* The game server verifies the proof through the worlds engine, if the proof in genuine the server instantiates the player into the world.
7. *CS/SS:* The player is given ftp credentials, these can be used to move items into a folder on the server.
8. *SS:* The server then verifies the items are real. If they are they are given the player in game.
9. *SS:* If a player is to receive items, they are placed in the players folder on the server. They can then be claimed by the player for transfer to another world.

## Notes on the Project 
Ready Player One was the main inspiration for this project, at the core of the novel is a centralisation issues over the control of the Oasis. The idea of one company owning such a large game is an analogous to one company owning the internet. When I started this project over six months ago I wasn't even planning on using a blockchain. If you go back in the commit history, you'll see that Worlds relied on an complex system of ledgers and auditing. At the time there was no blockchain that could provide the rapid finality required for my idea. In June 2018, the EOS main net launched and satisfied the response requirements. This meant we could get higher security in a less complex system developed in a fraction of the time.

Worlds uses a token, however there will be no ICO or crowd sale. In the future we will launch an airdrop.

### Token Cap Table
* 40% - Airdrop
* 40% - Given to Game Developers
* 20% - Kept for the Team.

## Contribution
If you wish to help with the project or are interested in developing a world, please reach out! Feedback welcome!

## TODO
  - Functionality
    - The client needs a way to deposit items into the world.
  - Security
    - The Serverside Worlds engine needs a whitelist of commands that it can execute (security hole)
  - Code Cleanliness
    - The Serverside Worlds engine needs to be cleaned up. There should be more common files between the client side and serverside Engines.
    - The port situation is somewhat confusing.
