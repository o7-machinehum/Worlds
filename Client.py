import socket
import sys, glob, os
import threading, logging, queue
import yaml
import pdb
import Worldcmd as WC

logging.basicConfig(level=logging. DEBUG, format='[%(levelname)s] (%(threadName)-10s) %(message)s')

def OpenSocket(ip, port, data):
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
			logging.debug('connection from: ' + str(client_address[0]) +':'+ str(client_address[1]))
			while True:
				data = connection.recv(256)
				if data:
					logging.debug('Recived data')
					logging.debug(data)
					data.put(data)
				else:
					logging.debug(str(client_address[0]) +':'+ str(client_address[1]) + ' Has disconnected')
					break
		finally:
			# Clean up the connection
			print('Closing Connection')
			connection.close()

def ConnectSocket(ip, port, data):
	logging.debug('Started ConnectSocket Thread')
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	# sock.connect((ip, port))
	while(True):
		out = data.get()
		logging.debug('Sending data')
		logging.debug(out)
		# Then actually send the data! :P

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
		print('Hi ' + player['Name'] + "!, You're in World: " + player['CurrentWorld']['Address'])
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
DataOut = queue.Queue()
DataOut.put(WC.HashAL(AL)) # Hash Action Ledger
Remote = threading.Thread(name='RemoteSocket', target=ConnectSocket, args=(player['CurrentWorld']['Address'], config['RemotePort'], DataOut, ))
Remote.start()
# 3. Sent public Key
# 3. Send hashed AL
# 4. Send Start piping actions

print('Opening Local Socket on port:' + str(config['LocalPort']))
DataIn = queue.Queue()
Local = threading.Thread(name='LocalSocket', target=OpenSocket, args=('localhost', config['LocalPort'], DataIn,))
Local.start()

print('World Engine Online')

