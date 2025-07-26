def extended_euclidean(a, b):
    if b == 0:
        return a, 1, 0
    gcd, x1, y1 = extended_euclidean(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return gcd, x, y
def mod_inverse(e, phi_n):
    gcd, x, _ = extended_euclidean(e, phi_n)
    if gcd == 1:
        return x % phi_n
    else:
        raise ValueError("Modular inverse does not exist.")