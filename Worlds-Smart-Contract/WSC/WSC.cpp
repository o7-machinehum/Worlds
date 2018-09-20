#include "WSC.hpp"

// using namespace eosio;
	
void WSC::createitem(account_name Owner, struct item Fitem){
	require_auth( Owner );

	item itemProof_table(_self, _self);
	item.find()
	
	/*Local Variables*/
	checksum256 calc_hash;

// item.GenesisTime = now();

}

// EOSIO_ABI( WSC, (createitem) )
