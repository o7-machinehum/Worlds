# Worlds

<img src="Graphics/Header.png" alt="drawing" width="1000"/>

Worlds is an open protocol designed to manage the economic and game theoretical components of a distributed MMO. This repository is focused on implementing the minimal dependencies for developers to get up and running. For more detailed into please read the paper [here](https://github.com/Machine-Hum/Worlds/blob/master/Worlds-Whitepaper/whitepaper.pdf).

## Worlds Smart Contract (WSC.cpp)
The worlds smart contract current based on eosio. It will be deployed on the EOS main net after completion.

### Dependencies
* [eosio](https://github.com/EOSIO/eos)
* [eosio.cdt](https://github.com/EOSIO/eosio.cdt)

### Building
```bash
cd Worlds-Smart-Contract/WSC/ ; make
```

## Worlds Client (Worlds.js)
The worlds client uses eosjs to communicate with the WSC.
