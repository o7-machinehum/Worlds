/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */

#include "WSC.hpp"

namespace eosio{


void WSC::createitem( name         owner,        // Creator of this item.
                      string       item_name,    // Name of the item.
                      string       item_class,   // Class of the item.
                      asset        stake         // How much WOR to stake into the item.
                    )
{

  require_auth( owner );
  require_recipient( owner );
  
  WSC::item item;
  
  item.Owner = owner;
  item.OriginWorld = owner;
  item.ItemName = item_name;
  item.ItemClass = item_class;
  item.Stake= stake;

  auto sym = stake.symbol;

  stats statstable( _self, sym.code().raw() );
  const auto& st = statstable.get( sym.code().raw() );
  
  eosio_assert( stake.is_valid(), "invalid quantity" );                           
  eosio_assert( stake.amount > 0, "must transfer positive quantity" );
  eosio_assert( stake.symbol == st.supply.symbol, "symbol precision mismatch" );
  sub_balance( owner, stake ); // Subtract Balance.
  
  capi_checksum256 calc_hash;
  item.GenesisTime = now();
  calc_hash = hashItem(item);
  
  itemProof_table itemProof(_self, owner.value);
  
  // Place the hash onchain   
  itemProof.emplace(owner, [&](auto& p) {
    p.itemHash = calc_hash;
    p.GenesisTime = item.GenesisTime;
  });
  
};

void WSC::liquiditem(    item                tx_item // Who's the owner.
                    )
{
  require_auth( tx_item.Owner );
  require_recipient( tx_item.Owner );

  capi_checksum256 hash;
  sha256((char*) &tx_item.ItemName, sizeof(tx_item), &hash);

  itemProof_table itemProof(_self, tx_item.Owner.value);

  auto chainHash = itemProof.get(*(uint64_t*)&hash); // Check to see if the item is onchain.
  auto itr = itemProof.find(*(uint64_t*)&hash);

  assert_sha256((char*) &tx_item.ItemName, sizeof(tx_item), &chainHash.itemHash); // Ensure hash matches matches
  itemProof.erase(itr); // Remove the hash from the table.

  add_balance(tx_item.Owner, tx_item.Stake, tx_item.Owner);
}

void WSC::transferitem( name                to,       // Who's getting the item.
                        item                tx_item   // Actual item package.
                      )
{
  capi_checksum256 calc_hash;
  
  require_auth( tx_item.Owner );
  require_recipient( tx_item.Owner );
  require_recipient( to );

  capi_checksum256 hash;
  sha256((char*) &tx_item.ItemName, sizeof(tx_item), &hash);

  itemProof_table itemProofFrom(_self, tx_item.Owner.value);
  
  // Check to see if the item is onchain.
  auto chainHash = itemProofFrom.get(*(uint64_t*)&hash);
  auto itr = itemProofFrom.find(*(uint64_t*)&hash);

  assert_sha256((char*) &tx_item.ItemName, sizeof(tx_item), &chainHash.itemHash); // Ensure hash matches matches
  itemProofFrom.erase(itr); // Remove the hash from the table.

  itemProof_table itemProofTo(_self, to.value);
  auto from = tx_item.Owner;
  tx_item.Owner = to;
  calc_hash = hashItem(tx_item);

  // 'from' is the gas payer.
  itemProofTo.emplace(from, [&](auto& p) {
    p.itemHash = calc_hash;
    p.GenesisTime = tx_item.GenesisTime;
  });
}

/*
  WARNING: This function deletes items without refunding WOR!
    It it mainly for refunding RAM if the user forgets the content of the items  
*/
void WSC::deleteitem( name                  owner,
                      capi_checksum256      hash
                    ) 
{
  require_auth( owner );

  itemProof_table itemProof(_self, owner.value);
  auto itr = itemProof.find(*(uint64_t*)&hash);
  
  print("Deleting Item");
  itemProof.erase(itr); // GONE!

}

void WSC::tradeitem( item               tx_item, // What are you trading 
                     item               rx_item  // What are you traing for
                   )
{
  require_auth( tx_item.Owner );

  /*
    -> Hash tx_item.
      -> Ensure it is on chain.
    -> Hash rx_item.
    -> Ensure there is not a trade channel open that has rx_item = hash(tx_item) && tx_item = hash(rx_item)
      -> If there is proceed to step X
    -> Then move the hash(tx_item) and hash(rx_item) into a trade channel
        -> This is a multi-index table that has two fields
          -> hash(tx_item)
          -> hash(rx_item)
    -> Delete the reference to tx_item on tx_item.Owner, it's now been moved into a trade channel.

    X-> Delete the trade channel and emplace tx_item on rx_item.Owners table. Then place rx_item on tx_item.Owners table!
     -> We've just made a trade :)

  */
}

void WSC::createwor( name   issuer,
                     asset  maximum_supply )
{
    require_auth( _self );

    auto sym = maximum_supply.symbol;
    eosio_assert( sym.is_valid(), "invalid symbol name" );
    eosio_assert( maximum_supply.is_valid(), "invalid supply");
    eosio_assert( maximum_supply.amount > 0, "max-supply must be positive");

    stats statstable( _self, sym.code().raw() );
    auto existing = statstable.find( sym.code().raw() );
    eosio_assert( existing == statstable.end(), "token with symbol already exists" );

    statstable.emplace( _self, [&]( auto& s ) {
       s.supply.symbol = maximum_supply.symbol;
       s.max_supply    = maximum_supply;
       s.issuer        = issuer;
    });
}


void WSC::issuewor( name to, asset quantity, string memo )
{
    auto sym = quantity.symbol;
    eosio_assert( sym.is_valid(), "invalid symbol name" );
    eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );

    stats statstable( _self, sym.code().raw() );
    auto existing = statstable.find( sym.code().raw() );
    eosio_assert( existing != statstable.end(), "token with symbol does not exist, create token before issue" );
    const auto& st = *existing;

    require_auth( st.issuer );
    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio_assert( quantity.amount > 0, "must issue positive quantity" );

    eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    eosio_assert( quantity.amount <= st.max_supply.amount - st.supply.amount, "quantity exceeds available supply");

    statstable.modify( st, same_payer, [&]( auto& s ) {
       s.supply += quantity;
    });

    add_balance( st.issuer, quantity, st.issuer );

    if( to != st.issuer ) {
      SEND_INLINE_ACTION( *this, transferwor, { {st.issuer, "active"_n} },
                          { st.issuer, to, quantity, memo }
      );
    }
}

void WSC::retirewor( asset quantity, string memo )
{
    auto sym = quantity.symbol;
    eosio_assert( sym.is_valid(), "invalid symbol name" );
    eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );

    stats statstable( _self, sym.code().raw() );
    auto existing = statstable.find( sym.code().raw() );
    eosio_assert( existing != statstable.end(), "token with symbol does not exist" );
    const auto& st = *existing;

    require_auth( st.issuer );
    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio_assert( quantity.amount > 0, "must retire positive quantity" );

    eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );

    statstable.modify( st, same_payer, [&]( auto& s ) {
       s.supply -= quantity;
    });

    sub_balance( st.issuer, quantity );
}

void WSC::transferwor( name    from,
                       name    to,
                       asset   quantity,
                       string  memo )
{
    eosio_assert( from != to, "cannot transfer to self" );
    require_auth( from );
    eosio_assert( is_account( to ), "to account does not exist");
    auto sym = quantity.symbol.code();
    stats statstable( _self, sym.raw() );
    const auto& st = statstable.get( sym.raw() );

    require_recipient( from );
    require_recipient( to );

    eosio_assert( quantity.is_valid(), "invalid quantity" );
    eosio_assert( quantity.amount > 0, "must transfer positive quantity" );
    eosio_assert( quantity.symbol == st.supply.symbol, "symbol precision mismatch" );
    eosio_assert( memo.size() <= 256, "memo has more than 256 bytes" );

    auto payer = has_auth( to ) ? to : from;

    sub_balance( from, quantity );
    add_balance( to, quantity, payer );
}

void WSC::sub_balance( name owner, asset value ) {
   accounts from_acnts( _self, owner.value );

   const auto& from = from_acnts.get( value.symbol.code().raw(), "no balance object found" );
   eosio_assert( from.balance.amount >= value.amount, "overdrawn balance" );

   from_acnts.modify( from, owner, [&]( auto& a ) {
         a.balance -= value;
      });
}

void WSC::add_balance( name owner, asset value, name ram_payer )
{
   accounts to_acnts( _self, owner.value );
   auto to = to_acnts.find( value.symbol.code().raw() );
   if( to == to_acnts.end() ) {
      to_acnts.emplace( ram_payer, [&]( auto& a ){
        a.balance = value;
      });
   } else {
      to_acnts.modify( to, same_payer, [&]( auto& a ) {
        a.balance += value;
      });
   }
}

void WSC::openwor( name owner, const symbol& symbol, name ram_payer )
{
   require_auth( ram_payer );

   auto sym_code_raw = symbol.code().raw();

   stats statstable( _self, sym_code_raw );
   const auto& st = statstable.get( sym_code_raw, "symbol does not exist" );
   eosio_assert( st.supply.symbol == symbol, "symbol precision mismatch" );

   accounts acnts( _self, owner.value );
   auto it = acnts.find( sym_code_raw );
   if( it == acnts.end() ) {
      acnts.emplace( ram_payer, [&]( auto& a ){
        a.balance = asset{0, symbol};
      });
   }
}

void WSC::closewor( name owner, const symbol& symbol )
{
   require_auth( owner );
   accounts acnts( _self, owner.value );
   auto it = acnts.find( symbol.code().raw() );
   eosio_assert( it != acnts.end(), "Balance row already deleted or never existed. Action won't have any effect." );
   eosio_assert( it->balance.amount == 0, "Cannot close because the balance is not zero." );
   acnts.erase( it );
}

capi_checksum256 WSC::hashItem(WSC::item &item){

  capi_checksum256 calc_hash;

  sha256((char*) &item.ItemName, sizeof(item), &calc_hash);

  print("ItemName: ", std::move(item.ItemName), "\n");
  print("ItemClass: ", std::move(item.ItemClass), "\n");
  print("ItemOwner: ", std::move(item.Owner), "\n");
  print("OriginWorld: ", std::move(item.OriginWorld), "\n");
  print("GenesisTime: ", std::move(item.GenesisTime), "\n");
  print("Stake: ", std::move(item.Stake), "\n");
 
  print("Sha256: ");
  printhex((const void*)&calc_hash, 32);
  
  return(calc_hash); 
}
} // namespace eosio
