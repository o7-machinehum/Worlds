#!/bin/bash

# arg1 = From
# arg2 = To
# arg3 = Ammount

cleos push action wsc.code transferwor '["turnip", "wsc.code", "10.00 WOR", "Hi"]' -p turnip@active
