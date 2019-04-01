#include <eosiolib/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] hello : public contract {
  public:
      using contract::contract;

      [[eosio::action]]
      void hi( name user ) {
         print( "Hello, ", user);
      }
  private:
    
};

EOSIO_DISPATCH(hello, (hi))
