from EEA import mod_inverse
from Primes import generate_Two_Primes
import random

pubKey = 0
privKey = 0
def generate_Keys():
    p,q = generate_Two_Primes()

    n = p*q
    phi = (p - 1)*(q - 1)

    global privKey
    global pubKey


    def privKey():
        try:
            global privKey
            global pubKey

            pubKey = random.randint(1,p)
            privKey = mod_inverse(pubKey, phi)

        except ValueError:
            privKey()
        
        return pubKey,privKey
    
    pubKey, privKey = privKey()
    return n

def generate_pub_key():
    return pubKey

def generate_priv_key():
    return privKey
