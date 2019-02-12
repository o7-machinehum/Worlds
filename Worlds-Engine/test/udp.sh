#!/bin/bash

# "Name": "turnip",
# "PubKey": "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
# "Data": "1550005850284turnip",
# "Proof": "SIG_K1_KX1VqVbdvSVXQLWb45utWcBB4TbNtXEEVPPs8sRLURsDLNjcyvpFeRukoYYcoH7Dq6DHtrWaPfaMxLCfaW95tiKuX1EqKg"

# verify(Proof, Data, PubKey)
echo "verify('SIG_K1_KX1VqVbdvSVXQLWb45utWcBB4TbNtXEEVPPs8sRLURsDLNjcyvpFeRukoYYcoH7Dq6DHtrWaPfaMxLCfaW95tiKuX1EqKg','1550005850284turnip', 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV')" > /dev/udp/127.0.0.1/30000
