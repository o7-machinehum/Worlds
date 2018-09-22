/** @file WSC.cpp
 *  @brief This is code the manages the Worlds Smart Contract..
 *  @author Ryan Walker
 *  @note 1tab = 2spaces!
 */

#include "WSC.hpp"
#include "../WOR/WOR.hpp"

using namespace eosio;

void WSC::createitem( account_name Owner, // Creator of this item.
                      string ItemName,    // Name of the item.
                      string ItemClass,   // Class of the item.
                      asset Stake         // How much WOR to stake into the item.
                    )
{
  require_auth( Owner );
  eosio_assert( Stake.is_valid(), "invalid quantity" );                                                                    
  eosio_assert( Stake.amount > 0, "must transfer positive quantity" );
  // eosio_assert( Stake.symbol == st.supply.symbol, "symbol precision mismatch" );

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
  
  /*Make this hash match!*/
  print("ItemName: ", item.ItemName, "\n");
  print("ItemClass: ", item.ItemClass, "\n");
  print("ItemOwner: ", item.Owner, "\n");
  print("PreviousOwner: ", item.PreviousOwner, "\n");
  print("OriginWorld: ", item.OriginWorld, "\n");
  print("GenesisTime: ", item.GenesisTime, "\n");
  print("TXtime: ", item.TXtime, "\n");
  print("Stake: ", item.Stake, "\n");

  sha256((char*) &item.ItemName, sizeof(item), &calc_hash);
  
  // for (int i = 0 ; i < 32 ; i++)
  print("Sha256: ");
  printhex((const void*)&calc_hash, 32);

  /*Create the table to hold the item.
    Arg1 - Contract Code Name.
    Arg2 - Scope. Do we want this in scope of the Owner?
  */
  itemProof_table itemProof(_self, _self);

  /* Place the hash onchain */  
  itemProof.emplace(Owner, [&](auto& p) {
    p.Owner = Owner;
    p.itemHash = calc_hash;
  });
	
	// Sub Balance from users token balance!

  print("\nHash Stored to blockchain.");
  
};

void WSC::transferitem( account_name   from,     // Who's sending the item.     
                        account_name   to,       // Who's getting the item      
                        item 				   TXitem,
												checksum256    hash      // What's the hash of the item 
                      )
{
  require_auth( from );
	
  checksum256 calc_hash;
  sha256((char*) &TXitem.ItemName, sizeof(TXitem), &calc_hash);
	
	eosio_assert(calc_hash == hash, "Hash does not match"); // Ensure the hash matches the item hash
	// Then ensure it's on the DB!	
	

}

