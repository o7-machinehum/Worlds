#!/bin/bash

# Make these into vars in the future
cleos push action wsc.code transferitem '{"from":"turnip", "to":"turnip2", "tx_item":{"ItemName":"Sword", "ItemClass":"Weapon", "Owner":"turnip", "PreviousOwner":"", "OriginWorld":"turnip", "GenesisTime":"1542250757", "TXtime":"0", "Stake":"1.00 WOR"}, "hash":"981ffde650d54b5e73afdbb846265c6bd514007f28a4f8db6c69205520e64481"}' -p turnip@active
