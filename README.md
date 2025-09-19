# Crypto Wallet 

This is a simple crypto / wallet demo app built with React (frontend) + Node.js / Express (backend).  
It uses **public/private key cryptography** to allow users to see balances and send “coins” securely, by signing transactions on the client and verifying on the server.

> ⚠️ This is a learning / demo project, not production-ready.

----

## Project Structure

/client # React frontend 
├─ src
│ ├── Wallet.jsx
│ ├── Transfer.jsx
│ └── server.js (axios config)
└─ package.json

/server # Express backend  <br>
├─ index.js <br>
├─ package.json  <br>
└─ (optional) scripts/ <br>


--

## Key Concepts / Flow

1. **Wallet (frontend)**
   - You enter your **private key**.
   - The frontend derives the **public key → Ethereum-style address** (Keccak256 of public key minus prefix, take last 20 bytes).
   - It calls the backend: `GET /balance/:address` to fetch that address’s balance.

2. **Signing & Sending Transaction**
   - You enter how much to send + recipient address.
   - The frontend builds a `message` object `{ amount, recipient }`, hashes it, and **signs it** with your private key.  
   - It sends `{ message, signature, recoveryBit }` to backend via `POST /send`.

3. **Server Verification (backend)**
   - Receives message + signature.
   - Hashes the message the same way.
   - Uses `recoverPublicKey` to get the public key from the signature + recoveryBit.
   - Derives the sender’s address from the public key.
   - Checks if sender has enough balance (or is known).  
   - Updates balances if valid; returns new balance or error.

4. **Balances**
   - The backend keeps an **in-memory** `balances` map (`address → amount`).
   - This is not persistent; restarting the server resets balances.

---

##  Getting Started

### Prerequisites
- Node.js & npm installed  
- Nodemon for auto-reload backend

### Setup

### In server folder
npm install

### In client folder
npm install

### Running

### Start the backend :-
cd server
nodemon index.js  or node index.js

### Start the frontend :-
cd client
npm run dev

Open the app in browser http://localhost:5173.
