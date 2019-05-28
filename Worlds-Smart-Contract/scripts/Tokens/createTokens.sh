#!/bin/bash

# Make these into vars in the future
cleos -u http://192.168.10.35:8888 push action wsc.code createwor '["wsc.code",  "1000.00 WOR"]' -p wsc.code@active
