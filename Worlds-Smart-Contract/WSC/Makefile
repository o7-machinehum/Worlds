# Makefile for the worlds smart contact

CC=eosio-cpp
Contract=WSC

all:
	@echo "Building"
	$(CC) $(Contract).cpp -o $(Contract).wasm --abigen

clean:
	rm -f $(Contract).wast
	rm -f *.abi
	rm -f $(Contract).wasm

deploy: all
	cleos set contract wsc.code ../$(Contract) -p wsc.code@active
