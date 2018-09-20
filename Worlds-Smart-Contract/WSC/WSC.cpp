#include "WSC.hpp"

using namespace eosio;

void WSC::createitem(account_name Owner, string ItemName, string ItemClass, asset Stake){
	require_auth( Owner );
	
	eosio_assert( Stake.is_valid(), "invalid quantity" );                                                                    
	eosio_assert( Stake.amount > 0, "must transfer positive quantity" );
	eosio_assert( Stake.symbol == st.supply.symbol, "symbol precision mismatch" );

	print("Creating Item: ", ItemName, " Of Class: ", ItemClass);
	// print("Staking: ", Stake.amount, Stake.symbol); Fix this later.

	checksum256 calc_hash;
	item item;

	/* Fill the structure. */
	item.ItemName = ItemName;
	item.ItemClass = ItemClass;
	item.Owner = Owner;
	item.PreviousOwner = 0x00;
	item.OriginWorld = Owner;
	item.GenesisTime = now();
	item.TXtime = 0x00;
	item.Stake = Stake;
	
	/*Create the table to hold the item.
		Arg1 - Contract Code Name.
		Arg2 - Scope. Do we want this in scope of the Owner?
	*/
	itemProof_table itemProof(_self, _self);

	sha256((char*) &item.ItemName, sizeof(item), &calc_hash);
	// printi128(calc_hash);
	

// item.GenesisTime = now();

};

// EOSIO_ABI( WSC, (createitem) )
