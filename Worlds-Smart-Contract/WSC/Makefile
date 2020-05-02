# Makefile for the worlds smart contact

CC=eosio-cpp
Contract=WSC

all:
	@echo "Building"
	$(CC) $(Contract).cpp

clean:
	rm -f $(Contract).abi
	rm -f $(Contract).wasm

deploy:
	cleos -u http://192.168.10.35:8888 set contract -f wsc.code ../$(Contract) -p wsc.code@active
