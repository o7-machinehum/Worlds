/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#pragma once

#include <eosio/asset.hpp>
#include <eosio/eosio.hpp>
#include <eosio/crypto.hpp>

#include <string>

namespace eosiosystem {
   class system_contract;
}

namespace eosio {

   using std::string;

   class [[eosio::contract("WSC")]] WSC : public contract {
      public:
         using contract::contract;

        /*This can just be a normal Struct*/
        struct item {
          string ItemName;
          string ItemClass;
          string Nuance;
          name Owner;
          name OriginWorld;
          uint32_t GenesisTime;
          asset Stake;
        };

         [[eosio::action]]
         void createitem( name owner, string item_name, string item_class, string nuance, asset stake );
        
         [[eosio::action]]
         void liquiditem( item tx_item );
        
         [[eosio::action]] 
         void transferitem( name to, item tx_item ); 

         [[eosio::action]] 
         void deleteitem( name owner, checksum256 hash ); 

         [[eosio::action]] 
         void tradeitem( item tx_item, item rx_item ); 
         
         [[eosio::action]]
         void createwor( name   issuer,
                         asset  maximum_supply);

         [[eosio::action]]
         void issuewor( name to, asset quantity, string memo );

         [[eosio::action]]
         void retirewor( asset quantity, string memo );

         [[eosio::action]]
         void transferwor( name    from,
                           name    to,
                           asset   quantity,
                           string  memo );

         [[eosio::action]]
         void openwor( name owner, const symbol& symbol, name ram_payer );

         [[eosio::action]]
         void closewor( name owner, const symbol& symbol );

         static asset get_supply( name token_contract_account, symbol_code sym_code )
         {
            stats statstable( token_contract_account, sym_code.raw() );
            const auto& st = statstable.get( sym_code.raw() );
            return st.supply;
         }

         static asset get_balance( name token_contract_account, name owner, symbol_code sym_code )
         {
            accounts accountstable( token_contract_account, owner.value );
            const auto& ac = accountstable.get( sym_code.raw() );
            return ac.balance;
         }

      private:
        struct [[eosio::table]] itemproof{
          checksum256  itemHash;
          
          uint64_t primary_key() const {return *(uint64_t*)&itemHash;}        // Primary Indices.
        };
        
        struct [[eosio::table]] tradechannel{
          checksum256  rx_item;
          checksum256  tx_item;
          name trader;

          uint64_t primary_key() const {return *(uint64_t*)&rx_item;}        // Primary Indices.
        };
         
        struct [[eosio::table]] account {
            asset    balance;

            uint64_t primary_key()const { return balance.symbol.code().raw(); }
         };

         struct [[eosio::table]] currency_stats {
            asset    supply;
            asset    max_supply;
            name     issuer;

            uint64_t primary_key()const { return supply.symbol.code().raw(); }
         };

         typedef eosio::multi_index< "accounts"_n, account > accounts;
         typedef eosio::multi_index< "stat"_n, currency_stats > stats;
         typedef eosio::multi_index< "itemproofs"_n, itemproof > itemProof_table;
         typedef eosio::multi_index< "tradechannel"_n, tradechannel > tradechannel_table;

         void sub_balance( name owner, asset value );
         void add_balance( name owner, asset value, name ram_payer );

         checksum256 hashItem(WSC::item &item);
         checksum256 hashItemCreate(name owner, string item_name, string item_class, asset stake);
         checksum256 hashItemTransfer(name NewOwner, name PreviousOwner, WSC::item item);

   };

} /// namespace eosio
