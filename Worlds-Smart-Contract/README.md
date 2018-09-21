# Worlds Smart Contract

## WOR
WOR is the contract that manages the WOR tokens that are designed to be used in the Worlds universe.

## WSC
The worlds smart contact is a contract that lives onchain. It is responsible for managing player assets.

### Open Questions
- itemProof should be referenced by it hash. Which is checksum265, I'm not sure how to use this as a ref.

- Do we need to keep the Owner onchain? This is in the proof package, so I think all we need is the hash.

- How do we lock funds in the WSC? sub_balance and add_balance are both private functions in the tokens contract. Maybe we just have to mash them togeather.
	- Try importing table from WOR into the WSC class then try to modify it from there, 
		change the permissions of the table.
