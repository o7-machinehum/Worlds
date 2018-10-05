# Worlds Smart Contract

## WSC
The worlds smart contact is a contract that lives onchain. It is responsible for managing player assets. It also manages WOR, which is the token that can be staked against items. The token can also be used as a means of currency in the Worlds universe.

##TODO
- LiquidateItem() - Done. 
- TransferItem() - Done.

## Open Questions
- itemProof should be referenced by it hash. Which is checksum265, I'm not sure how to use this as a ref. It's possible to reference them by hash, but after the lookup you must check the entire hash.

- How do you get unix time out of the function so the user can calculate the hash?
  - I still don't know how to do this.

- In the transfer item function, I need a way to move the ram 
