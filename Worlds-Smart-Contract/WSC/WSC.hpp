/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */

#include <utility>
#include <vector>
#include <string>

#include <eosiolib/asset.hpp>
#include <eosiolib/eosio.hpp>
#include <eosiolib/crypto.h>
#include <eosiolib/types.h>
#include <eosiolib/time.hpp>
#include <eosiolib/contract.hpp>

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
		void createitem(account_name Owner, string ItemName, string ItemClass, asset Stake);

	private:
		// @abi table itemProof i64
		struct itemProof{
			account_name Owner;
			checksum256  itemHash;
			
			account_name primary_key() const {return Owner;} // Double check this is the future! These should really be ref'd by their hash!
			EOSLIB_SERIALIZE(itemProof, (Owner)(itemHash))
		};

		typedef eosio::multi_index<N(itemProofs), itemProof> itemProof_table;

};

EOSIO_ABI(WSC, (createitem))
