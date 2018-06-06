from Crypto.PublicKey import RSA
from Crypto.Random import get_random_bytes
from Crypto.Cipher import AES, PKCS1_OAEP

# TODO: Is this secure?
private_key = None
public_key = None

# http://pycryptodome.readthedocs.io/en/latest/src/examples.html
def GenKeys():
	global private_key	
	global public_key
 
	key = RSA.generate(2048)
	
	private_key = key.export_key()
	file_out = open("keys/private.pem", "wb")
	file_out.write(private_key)

	public_key = key.publickey().export_key()
	file_out = open("keys/public.pem", "wb")
	file_out.write(public_key)

def LoadKeys():
	global private_key	
	global public_key
 
	private_key = RSA.import_key(open("keys/private.pem").read()) 
	public_key = RSA.import_key(open("keys/public.pem").read())

#TODO: Fix all this
def Encrypt(packet):
	if private_key == None:
		print('Please load in your keys')
	else:
		cipher_rsa = PKCS1_OAEP.new(private_key)		
		cipher_rsa.decrypt(packet)
