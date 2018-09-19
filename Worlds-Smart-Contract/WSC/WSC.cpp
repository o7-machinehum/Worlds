#include "WSC.hpp"

using namespace eosio;


struct item {
	char ItemName[30];
	char ItemClass[30];
	account_name Owner ;
	account_name PreviousOwner;
	account_name OriginWorld;
	time GenesisTime;
	time TXtime;
	float Stake;
};


class WSC: public eosio::contract {
	public:
		using contract::contract;
		
			void createitem(account_name user) {
    	require_auth( user );
			
			/*Local Variables*/
			checksum256 calc_hash;

			// item.GenesisTime = now();

      }
};

EOSIO_ABI( WSC, (createitem) )
