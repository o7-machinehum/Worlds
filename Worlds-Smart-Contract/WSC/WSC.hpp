/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <eosiolib/asset.hpp>
#include <eosiolib/eosio.hpp>
#include <eosiolib/crypto.h>
#include <eosiolib/types.h>

#include <string>

using namespace eosio;
using std::string;

class WSC: public contract{
	public:
		WSC(account_name self) : contract(self) {}
		
		/*This can just be a normal Struct*/
		struct item {
			string ItemName;
			string ItemClass;
			account_name Owner;
			account_name PreviousOwner;
			account_name OriginWorld;
			time GenesisTime;
			time TXtime;
			asset Stake;
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
