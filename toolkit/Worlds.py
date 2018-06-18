import socket
import sys, glob, os
import threading, logging
import yaml
import pdb
import Worldcmd as WC

logging.basicConfig(level=logging. DEBUG, format='[%(levelname)s] (%(threadName)-10s) %(message)s')
# logging.getLogger().addHandler(logging.StreamHandler())

def OpenSocket(ip, port):
	logging.debug('Started OpenSocket Thread')
	# Create a TCP/IP socket
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

	# Bind the socket to the port
	server_address = (ip, port)
	print('starting up on {} port {}'.format(*server_address))
	sock.bind(server_address)

	sock.listen(1)

	while True:
		# Wait for a connection
		print('waiting for a connection')
		connection, client_address = sock.accept()
		try:
			print('connection from', client_address)

			# Receive the data in small chunks and retransmit it
			while True:
				data = connection.recv(16)
				print('received {!r}'.format(data))
				if data:
					print('sending data back to the client')
					connection.sendall(data)
				else:
					print('no data from', client_address)
					break
		finally:
			# Clean up the connection
			print('Closing Connection')
			connection.close()

# Main Routine
#-------------
print('Opening Master Config File')
with open("config.yaml", 'r') as stream:
	try:
		config = yaml.load(stream)
	except yaml.YAMLError as exc:
		print(exc)

print('Opening RSA Key pair')
if(os.path.exists('keys/private.pem')):
	WC.LoadKeys()
else:
	if(input('No RSA Key pair found. Create?(y/n):') == 'y'):
		WC.GenKeys()
		WC.LoadKeys()
		print('Your RSA Key pair are listed in the keys/ directory, keep them safe!')

print('Loading Action Listing')
with open("ActionListing.yaml", 'r') as stream:
	try:
		AList = yaml.load(stream)
	except yaml.YAMLError as exc:
		print(exc)

print('Opening Player file')
if(os.path.exists('player.yaml')):
	with open("player.yaml", 'r') as stream:
		try:
			player = yaml.load(stream)
		except yaml.YAMLError as exc:
			print(exc)
		print('Hi ' + player['Name'] + "!, You're in World:" + player['CurrentWorld']['Address'])
else:
	if(input('No player file found. Form player genesis?(y/n):') == 'y'):
		World = input('Please Enter World Address:')
		# TODO: Genesis Request package

matching = [s for s in os.listdir('AL') if player['CurrentWorld']['Address'] in s]
if matching == None:
	print('Missing Action Ledger, exiting')
	exit()
else:
	time = [x[:x.find(':')] for x in matching]
	ALname = 'AL/' + max(time) + ':' + player['CurrentWorld']['Address']
	print('Opening Action Ledger: ' + ALname)
	AL = open(ALname, 'r+')


print('Launching Client')
if(input('Open: ' + player['CurrentWorld']['Client'] + '(y/n):') == 'y'):
	0
	# Launch Current world
else:
	exit()

print('Signing into World')
WC.HashAL(AL) # Hash Action Ledger
# 1. Open Socket with world
# 2. Sent public Key
# 3. Send hashed AL
# 4. Send Start piping actions

print('Opening Local Socket on port:' + str(config['port']))
Local = threading.Thread(name='LocalSocket', target=OpenSocket, args=('localhost', config['port'],))
Local.start()
# 1. Open local socket on port
# 2. Accecpt Actions on that socket

# Wait until everything is up, then issue
#print('World Engine Online')


