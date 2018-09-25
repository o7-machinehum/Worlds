# Makefile for the worlds smart contact

CC=eosio-cpp
Contract=WOR

all:
	@echo "Building"
	$(CC) $(Contract).cpp -o $(Contract).wasm --abigen

clean:
	rm -f $(Contract).wast
	rm -f *.abi
	rm -f $(Contract).wasm

deploy: all
	# cleos set contract wor.token ../$(Contract) -p wor.token@active
	cleos set contract wor.token ../$(Contract) -p wor.token@active
