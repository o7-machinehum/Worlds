/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <eosiolib/asset.hpp>
#include <eosiolib/eosio.hpp>
#include <eosiolib/crypto.h>
#include <eosiolib/types.h>

using namespace eosio;

class WSC: public contract{
	public:
		WSC(account_name self) : contract(self) {}
		
		/*This can just be a normal Struct*/
		struct item {
			char ItemName[30];
			char ItemClass[30];
			account_name Owner;
			account_name PreviousOwner;
			account_name OriginWorld;
			time GenesisTime;
			time TXtime;
			float Stake;
		};
		
		// @ abi action
		void createitem(account_name Owner, struct item Fitem);

	private:
		// @abi table itemProof i64
		struct itemProof{
			account_name Owner;
			checksum256  itemHash;
			
			account_name primary_key() const {return Owner;}
			EOSLIB_SERIALIZE(itemProof, (Owner)(itemHash))
		};

		typedef eosio::multi_index<N(itemProofs), itemProof> itemProof_table;

};

EOSIO_ABI(WSC, (createitem))