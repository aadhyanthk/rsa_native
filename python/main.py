from Keys import generate_Keys
from Encrypt import encrypt_code
from Decrypt import decrypt
from Keys import generate_pub_key

inp = input("Enter text for encryption:")
prod = generate_Keys()
pubKey = generate_pub_key()
encrypted_input = encrypt_code(inp,prod,pubKey)
print(encrypted_input)


decrypted_input = decrypt(encrypted_input, prod)
print(decrypted_input)
if inp == decrypted_input:
    print("Integrity maintained")