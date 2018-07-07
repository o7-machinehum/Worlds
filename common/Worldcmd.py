import yaml
import pdb
import Keys 
import time

# Open YAML config file
with open("config.yaml", 'r') as stream:
	try:
		config = yaml.load(stream)
	except yaml.YAMLError as exc:
		print(exc)

# Open YAML Action listing file
with open("ActionListing.yaml", 'r') as stream:
	try:
		AL = yaml.load(stream)
	except yaml.YAMLError as exc:
		print(exc)

def t():
	return(int(time.time()))

def LoadKeys():
	Keys.LoadKeys()

def GenKeys():
	Keys.GenKeys()

def Encrypt(packet):
	return(Keys.Encrypt(packet))

def Decrypt(packet):
	return(Keys.Decrypt(packet).decode("utf-8"))

def PrintAL():
	print(AL)

def FormPayload(Code, SubCode, Argument=0x00):
	Packet = str(t()) + '.' + str(Code) + '.' + str(SubCode) + '.' + str(Argument)
	return(Encrypt(Packet))

def HashAL(AL):
	return(Keys.Hash(str.encode(AL.read())))
