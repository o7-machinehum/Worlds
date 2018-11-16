# Worlds

<img src="Graphics/Header.png" alt="drawing" width="1000"/>

Worlds is an open protocol designed to manage the economic and game theoretical components of a distributed MMO. This repository is focused on implementing the minimal dependencies required for developers to get up and running, it it still under development and has a planned deployment in 2019 on the EOS main net. For more detailed info please read the paper [here](https://github.com/Machine-Hum/Worlds/blob/master/Worlds-Whitepaper/whitepaper.pdf). This repository contains three main components.

* The Worlds Whitepaper
* The Worlds Engine
* The World Smart Contract

## Worlds Smart Contract 
The Worlds Smart Contact (WSC) is an EOS contract that is responsible for managing player assets and WOR. WOR is a token that can be staked against items and used as a means of currency. The contract is still under development and subject to change!

### Building / Deploying
```bash
cd Worlds-Smart-Contract/WSC/ ; make
make deploy
```

### Dependencies
The WSC is build using eosio.cdt 1.3+
* [eosio](https://github.com/EOSIO/eos)
* [eosio.cdt](https://github.com/EOSIO/eosio.cdt)

## Scripting
Various simple scripts have been written to test the WSC. Before running them be sure to open them and change the required fields depending on your account names and application.

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
The worlds client is wallet that enables players to view, create, trade and liquidate items, exp and WOR. The worlds client uses eosjs to communicate with the WSC. For now it will host a simple UDP server that will accept commands from the game client. It will also be possible for players to manually enter commands. 

## Funding
When I started this project over six months ago I wasn't even planning on using a blockchain. If you go back in the commit history, it can be seen that Worlds relied on an overly complex system of ledgers and auditing. At the time there was no blockchain that could give me the rapid finality required for a game. In June the EOS main net launched and changed everything, this means I could get higher security in a less complex system developed in a fraction of the time.

Even though the project uses a token there will be no ICO or crowd sale. I wish to avoid the stigma of a scam, and don't want to take people's money. However I do need to raise for the airdrop, so I'm reserving 10% for private investment, if I find cash from another outlet I will use that instead.

### Token Cap Table
* 40% - Airdrop
* 40% - Given to Game Developers
* 10% - Sold to Private investors
* 10% - Kept for the Team.

## Contribution
If you wish to help with the project or are interested in developing a world, please reach out!
