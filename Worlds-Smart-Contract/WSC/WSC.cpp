#include <eosiolib/eosio.hpp>

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
}

class WSC: public eosio::contract {
	public:
		using contract::contract;
		
		checksum CreateItem(const account_name user ,const asset& quantity) {
    	require_auth( user );
			
			item.GenesisTime = now()

      }
};

EOSIO_ABI( hello, (hi) )
