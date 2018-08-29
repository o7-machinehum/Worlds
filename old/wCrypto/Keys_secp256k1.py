# https://github.com/warner/python-ecdsa

from ecdsa import SigningKey
sk = SigningKey.generate()
vk = sk.get_verifying_key()

open("keys/private.pem","w").write(sk.to_pem())
open("keys/public.pem","w").write(vk.to_pem())
