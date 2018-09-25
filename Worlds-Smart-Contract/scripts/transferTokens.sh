#!/bin/bash

# To="turnip2"
# From="turnip"
# Amount="10.00 WOR"

cleos push action wor.code transfer '["turnip", "turnip2", "10.00 WOR", "Hi"]' -p turnip@active
