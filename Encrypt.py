from Keys import generate_pub_key
from Primes import * 

def encrypt_code(inp,prod, pubKey):
    def encode_inp(input_str):
        list_inp = list(input_str)
        mod_list_inp = []
        for i in list_inp:
            a = ord(i)
            mod_list_inp.append(a)
        return mod_list_inp
    
    def encrypt(inp_li, prod, pubKey):
        encrypted_inp = []
        for i in inp_li:
            a = i
            for j in range(pubKey - 1):
                a = a * i
                a = a % prod
            encrypted_inp.append(a)
        return encrypted_inp
    

    converted_input = encode_inp(inp)

    encrypted_1 = encrypt(converted_input, prod, pubKey)
    
    return encrypted_1