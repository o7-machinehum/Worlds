# Makefile for the worlds smart contact

CC=eosiocpp
Contract=WOR

all:
	@echo "Building"
	$(CC) -o $(Contract).wast $(Contract).cpp 
	$(CC) -g $(Contract).abi $(Contract).cpp

clean:
	rm -f $(Contract).wast
	rm -f $(Contract).abi
	rm -f $(Contract).wasm

deploy: all
	cleos set $(Contract) wsc.code ../$(Contract) -p wsc.code@active
