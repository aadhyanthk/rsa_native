# RSA Encryption Project (Python & Web Chat Demo)

This repository demonstrates the fundamentals of RSA encryption/decryption through both a Python command-line tool and a web-based encrypted group chat app.

## Project Overview

RSA is a classic public-key cryptosystem central to modern cryptography.  
This project is designed for learning purposes and showcases:
- How public and private keys are generated
- How messages are encrypted and decrypted
- How public-key encryption can be used in both scripts and browser-based apps

## Project Structure

### Python Implementation
- **main.py** — Interactive command-line interface for RSA encryption and decryption
- **Primes.py** — Generates random primes for key creation
- **Keys.py** — Handles key generation, modular inverse, and key storage
- **EEA.py** — Uses the Extended Euclidean Algorithm for calculating modular inverses
- **Encrypt.py** — Converts plaintext to integers and applies RSA encryption
- **Decrypt.py** — Decrypts ciphertext and restores readable text

### Web Demo
- **index.js** — Node.js server using Express and Socket.IO for encrypted group chat; manages server-side key generation/encryption
- **index.html** — Simple browser-based chat interface; generates keys client-side and encrypts messages sent to the server

## How to Use

### Python Command-Line Demo

1. **Clone** the repository and place all Python files in the same folder.
2. **Run the CLI program:**
   ```
   python main.py
   ```
3. **Follow prompts** to enter your plaintext. The application will generate keys, encrypt your input, display the ciphertext, then decrypt to verify correctness.

### Web Encrypted Chat Demo

1. **Place** both `index.js` and `index.html` in the same directory.
2. **Install dependencies (in the terminal):**
   ```
   npm install express socket.io
   ```
3. **Start the server:**
   ```
   node index.js
   ```
4. **Open your browser** and navigate to the address shown in your terminal (typically http://localhost:3000).
5. **Enter a username** in the chat UI. All messages are encrypted/decrypted with RSA in the browser and server.
6. **Share the URL with others** on your network for group chat.

## Notes

- All cryptographic routines here are simple, hand-coded, and use small primes—**not suitable for real-world or production use**.
- This project is intended for educational demonstration. The focus is on understanding the flow of keys, encryption, and decryption—not on cryptographic strength or security best practices.
- The web chat demo provides a practical view of public-key exchange and per-user, per-message encryption in a real application setting.
- If running on a network, actual client/server communication can be observed live as messages are sent and received.
