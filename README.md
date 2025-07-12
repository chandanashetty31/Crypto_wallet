# 💸 My Crypto Wallet

A simple front-end crypto wallet application built using **React**, **Vite**, and **Ethereum cryptography** libraries. It allows users to:
- Enter a private key to view their wallet address and balance
- Sign and send transactions using elliptic curve cryptography (secp256k1)
- Interact with a local backend server to fetch and update balances

## 🚀 Features

- 🔐 Secure private key input
- 📬 Transaction signing with `noble-secp256k1`
- 🔄 Real-time balance updates via backend
- ✨ Built with Vite for fast development


## 🛠️ Tech Stack

### Frontend:
- React
- Vite
- SCSS
- Axios
- noble-secp256k1
- ethereum-cryptography

### Backend:
- Node.js
- Express.js
- Local transaction and balance simulation

  
## 📦 Installation

### 1. Clone the Repository

git clone https://github.com/your-username/crypto-wallet.git <br>
cd crypto-wallet/client

### 2.Install Dependencies

npm install

### 🧪 Run the App

### 1. Start the Frontend (React + Vite)

npm run dev <br>
Open your browser at http://localhost:5173

### 2. Start the Backend Server (in a separate terminal)

cd ../server <br>
node index.js <br>
Make sure the backend is listening on http://localhost:3042

### 📌 Example Workflow

Enter a private key (generates wallet address) <br>
View current balance <br>
Enter recipient address and amount <br>
Sign the transaction using your private key <br>
Submit and update balances <br>
