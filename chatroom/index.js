const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const os = require('os');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

function extended_euclidean(a, b) {
  if (b === 0) return [a, 1, 0];
  let [gcd, x1, y1] = extended_euclidean(b, a % b);
  return [gcd, y1, x1 - Math.floor(a / b) * y1];
}

function mod_inverse(e, phi_n) {
  let [gcd, x] = extended_euclidean(e, phi_n);
  if (gcd !== 1) return null;
  return (x % phi_n + phi_n) % phi_n;
}

function generate_Prime() {
  while (true) {
    let x = Math.floor(Math.random() * (100-10)) + 10;
    let isPrime = true;
    for (let i = 2; i * i <= x; i++) {
      if (x % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) return x;
  }
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function generate_Keys() {
  let p, q, n, phi, pubKey, privKey;

  while (true) {
    p = generate_Prime();
    do {
      q = generate_Prime();
    } while (q === p);

    n = p * q;
    phi = (p - 1) * (q - 1);

    pubKey = Math.floor(Math.random() * (phi - 1)) + 2;

    if (gcd(pubKey, phi) !== 1) continue;

    privKey = mod_inverse(pubKey, phi);
    if (privKey !== null) break;
  }

  return { n, privKey, pubKey };
}

function mod_pow(base, exponent, mod) {
  let result = 1;  // Initialize result to 1

  for (let i = 0; i < exponent; i++) {
    result = (result * base) % mod;  // Multiply result by base, and take modulus
  }

  return result;  // Return the final result
}

function decrypt_RSA(arr, priv, prod) {
  return arr.map(num => mod_pow(num, priv, prod)).map(c => String.fromCharCode(c)).join('');
}

function encrypt_RSA(text, pub, prod) {
  return text.split('').map(c => mod_pow(c.charCodeAt(0), pub, prod));
}

const { n: server_n, privKey: server_priv, pubKey: server_pub } = generate_Keys();

const clients = new Map();

io.on('connection', (socket) => {
  console.log("New client connected");

  // Send server's public key to the client
  socket.emit('server_keys', { prod: server_n, pubKey: server_pub });

  // Receive client's public key
  socket.on('client_keys', ({ client_n, client_pub, username }) => {
    clients.set(socket.id, { client_n, client_pub, username});
    console.log(`Stored keys for ${socket.id}`);
  });

  // When message received from a client
  socket.on('chat message', ({msg, sender}) => {
    const decryptedText = decrypt_RSA(msg, server_priv, server_n);
    console.log(`Decrypted from client ${sender}: ${decryptedText}. Originally recieved as ${msg}`);

    // Encrypt separately for each client
    clients.forEach(({ client_n, client_pub, username }, clientId) => {
      const encForClient = encrypt_RSA(decryptedText, client_pub, client_n);
      io.to(clientId).emit('chat message', {msg: encForClient, sender: sender});
      console.log(`Server sent message ${decryptedText} as ${encForClient} to user ${username}.`)
    });
  });

  socket.on('disconnect', () => {
    clients.delete(socket.id);
  });
});

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const PORT = 3000;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
  const ip = getLocalIP();
  console.log(`Server running at http://${ip}:${PORT}`);
});