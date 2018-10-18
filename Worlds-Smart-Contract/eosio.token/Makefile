# Makefile for the worlds smart contact

CC=eosio-cpp
Contract=eosio.token

all:
	@echo "Building"
	# $(CC) $(Contract).cpp -o $(Contract).wasm --abigen
	$(CC) $(Contract).cpp -o $(Contract).wasm

clean:
	rm -f $(Contract).wast
	# rm -f *.abi
	rm -f $(Contract).wasm

deploy:
	cleos set contract wsc.code ../$(Contract) -p wsc.code@active
