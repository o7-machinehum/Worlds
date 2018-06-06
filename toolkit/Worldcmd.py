import yaml
import pdb
import Keys 

# Open YAML config file
with open("config.yaml", 'r') as stream:
	try:
		config = yaml.load(stream)
	except yaml.YAMLError as exc:
		print(exc)

def help():
	print('Worlds Toolkit V' + str(config['Toolkit']['Version']))
	print('--------------------')
	print('help -> Show this menu')
	print('LoadKeys -> Load in keys')
	print('GenKeys -> Generate Keys')
	print('Encrypt <packet> -> Encrypt Packet w/ Private key')

def LoadKeys():
	Keys.LoadKeys()

def GenKeys():
	Keys.GenKeys()

def Encrypt(packet):
	Keys.Encrypt(packet)
