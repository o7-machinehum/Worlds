#!/bin/bash

arg=''\''{"owner":"turnip","hash":"'$1'"}'\'''
echo $arg

# idk why this isn't working
# cleos push action wsc.code deleteitem '{"owner":"turnip","hash":"{$1}"}' -p turnip@active
cleos push action wsc.code deleteitem $arg turnip@active
