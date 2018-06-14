from Crypto.PublicKey import RSA
from Crypto.Random import get_random_bytes
from Crypto.Cipher import AES, PKCS1_OAEP
import pdb

# Ensure pycryptodome is install and not pycrypto

# TODO: Is this secure?
private_key = None
public_key = None

# http://pycryptodome.readthedocs.io/en/latest/src/examples.html
def GenKeys():
	global private_key	
	global public_key
 
	key = RSA.generate(1024)
	
	public_key = key.export_key()
	file_out = open("keys/public.pem", "wb")
	file_out.write(public_key)

	private_key = key.publickey().export_key()
	file_out = open("keys/private.pem", "wb")
	file_out.write(private_key)

def LoadKeys():
	global private_key	
	global public_key
 
	private_key = RSA.import_key(open("keys/private.pem").read()) 
	public_key = RSA.import_key(open("keys/public.pem").read())

# packet is bytes
def Encrypt(packet):
	global private_key	
	global public_key
	
	try:	
		cipher_rsa = PKCS1_OAEP.new(private_key)		
		return(cipher_rsa.encrypt(str.encode(packet)))
	except AttributeError:
		print('Please load in your keys')

# TODO: This should accept public key as argument
def Decrypt(packet):
	global private_key	
	global public_key
	
	try:	
		cipher_rsa = PKCS1_OAEP.new(public_key)		
		return(cipher_rsa.decrypt(packet))
	except AttributeError:
		print('Please load in your keys')
