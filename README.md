# Worlds

<img src="Graphics/Header.png" alt="drawing" width="1000"/>

Worlds is an open protocol designed to manage the economic and game theoretical components of a distributed MMO. This repository is focused on implementing the minimal dependencies required for developers to get up and running. For more detailed info please read the paper [here](https://github.com/Machine-Hum/Worlds/blob/master/Worlds-Whitepaper/whitepaper.pdf). This repository contains three main components, the whitepaper, the Worlds engine and the World Smart Contract. It it currently under development.

## Worlds Smart Contract (WSC.cpp)
The Worlds Smart Contact (WSC) is an EOS contract that is responsible for managing player assets and WOR. WOR is a token that can be staked against items and used as a means of currency.

### Dependencies
* [eosio](https://github.com/EOSIO/eos)
* [eosio.cdt](https://github.com/EOSIO/eosio.cdt)

### Building
```bash
cd Worlds-Smart-Contract/WSC/ ; make
```

### TODO
- Functions
  - createExp

- Testing
  - Liquidate Item
  - Trasnder Item
  - 
  
## Worlds Client (Worlds.js)
The worlds client uses eosjs to communicate with the Wor

### TODO
- Socket server.
- Function for creating items.
- Pretty much everything.
