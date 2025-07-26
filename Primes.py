import random

p = 0
q = 0
low = 1000
high = 10000

def generate_Prime():
    while True:
        isPrime = 0
        x = random.randint(low,high)
        for i in range(1, x):
            if (x % i) == 0:
                isPrime = isPrime + 1
        if isPrime > 2:
            continue
        return x

def generate_Two_Primes():
    global p
    global q
    p = generate_Prime()
    q = generate_Prime()
    if p > q:
        return q, p
    else:
        return p,q

def product_primes():
    return p * q
