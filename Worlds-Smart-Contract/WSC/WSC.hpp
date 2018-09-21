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
    
    // @ abi action
    void createitem(account_name Owner, string ItemName, string ItemClass, asset Stake);
    // @ abi action
    void transferitem( account_name from, account_name to, checksum256 hash); 

  private:
    // @abi table itemproofs i64
    struct itemproof{
      account_name Owner;
      checksum256  itemHash;
      
      account_name primary_key() const {return Owner;} 
      EOSLIB_SERIALIZE(itemproof, (Owner)(itemHash))
    };

    typedef eosio::multi_index<N(itemproofs), itemproof> itemProof_table;

};

EOSIO_ABI(WSC, (createitem)(transferitem))
