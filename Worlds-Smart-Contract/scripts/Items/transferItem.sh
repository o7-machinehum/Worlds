#!/bin/bash

# Make these into vars in the future
cleos push action wsc.code transferitem '{"to":"turnip2", "tx_item":{"ItemName":"Sword", "ItemClass":"Weapon", "Owner":"turnip", "OriginWorld":"turnip", "GenesisTime":"1542852797", "Stake":"1.00 WOR"}}' -p turnip@active
