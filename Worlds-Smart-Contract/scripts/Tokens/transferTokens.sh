#!/bin/bash

# arg1 = From
# arg2 = To
# arg3 = Ammount

cleos push action wor.token transfer '["turnip", "wor.token", "10.00 WOR", "Hi"]' -p turnip@active
