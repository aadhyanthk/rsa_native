from Keys import *
from Primes import *

def decrypt(inp,prod):
    priv = generate_priv_key()

    def decrypt_list(inp):
        ans = []
        for i in inp:
            a = i
            for j in range(priv - 1):
                a = (a * i) % prod
            ans.append(a)
        return ans
    
    def decode(ans_list):
        ans = ""
        for i in ans_list:
            ans = ans + chr(i)
        return ans
    
    ans_list = decrypt_list(inp)
    ans = decode(ans_list)
    return ans