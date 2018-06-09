from Crypto.PublicKey import RSA
from Crypto.Random import get_random_bytes
from Crypto.Cipher import AES, PKCS1_OAEP

# data = get_random_bytes(16)
data = str.encode('This is something')
print(data) # Just random stuff

private_key = RSA.import_key(open("keys/public.pem").read())

cipher_rsa = PKCS1_OAEP.new(private_key)
print('Crypted data->')
crypted = cipher_rsa.encrypt(data)
print(crypted)

public_key = RSA.import_key(open("keys/private.pem").read())
cipher_rsa = PKCS1_OAEP.new(public_key)
print('Decrypted data->')
print(cipher_rsa.decrypt(crypted))
