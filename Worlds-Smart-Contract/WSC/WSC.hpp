/** @file WSC.cpp
 *  @brief This file contains the classes to be used in the WSC.
 *  @author Ryan Walker
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
    
		[[eosio::action]]        
    void createitem(account_name Owner, string ItemName, string ItemClass, asset Stake);
		
		[[eosio::action]]        
    void transferitem( account_name from, account_name to, item TxItem, checksum256 hash); 
         
		// WOR( account_name self ):contract(self){}

		/** Token Actions **/
		[[eosio::action]]
		void create( account_name issuer,
								asset        maximum_supply);

		[[eosio::action]]        
		void issue( account_name to, asset quantity, string memo );

		[[eosio::action]]
		void transfer( account_name from,
									account_name to,
									asset        quantity,
									string       memo );

		inline asset get_supply( symbol_name sym )const;

		inline asset get_balance( account_name owner, symbol_name sym )const;

		struct transfer_args {
			account_name  from;
			account_name  to;
			asset         quantity;
			string        memo;
		};

  private:
    struct [[eosio::table]] itemproof{
      account_name Owner;
      checksum256  itemHash;
      
      account_name primary_key() const {return Owner;}				// Primary Indices.
      checksum256 get_secondary_1() const {return itemHash;}	// Secondary Indicies.
			
			EOSLIB_SERIALIZE(itemproof, (Owner)(itemHash))
    };
    typedef eosio::multi_index<N(itemproofs), itemproof> itemProof_table;

		/** Token Private Members **/
		struct [[eosio::table]] account {
			asset    balance;

			uint64_t primary_key()const { return balance.symbol.name(); }
		};

		struct [[eosio::table]] currency_stats {
			asset          supply;
			asset          max_supply;
			account_name   issuer;

			uint64_t primary_key()const { return supply.symbol.name(); }
		};

		typedef eosio::multi_index<N(accounts), account> accounts;
		typedef eosio::multi_index<N(stat), currency_stats> stats;

		void sub_balance( account_name owner, asset value );
		void add_balance( account_name owner, asset value, account_name ram_payer );

};

asset WSC::get_supply( symbol_name sym )const
   {
      stats statstable( _self, sym );
      const auto& st = statstable.get( sym );
      return st.supply;
   }

   asset WSC::get_balance( account_name owner, symbol_name sym )const
   {
      accounts accountstable( _self, owner );
      const auto& ac = accountstable.get( sym );
      return ac.balance;
   }

EOSIO_ABI(WSC, (createitem)(transferitem))
