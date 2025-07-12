const express = require("express");
const cors = require("cors");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x3cc739dc496924d5ab16f24bd3a95590632fd78c": 100,
  "0x20a518cfb58e8a9445ae8f6a8e8afa634b61dfd3": 50,
  "0x614193aba03776f81b033ad3bba63f85b46b9dad": 75,
};


app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { message, signature, recoveryBit } = req.body;
  const { amount, recipient } = message;

  const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)));

  try {
    const publicKey = secp.recoverPublicKey(messageHash, signature, recoveryBit);
    const sender = "0x" + toHex(keccak256(publicKey.slice(1)).slice(-20));

    if (!balances[sender] || balances[sender] < amount) {
      return res.status(400).send({ message: "Not enough funds or unknown sender!" });
    }

    if (!balances[recipient]) {
      balances[recipient] = 0;
    }

    balances[sender] -= amount;
    balances[recipient] += amount;

    res.send({ balance: balances[sender] });
  } catch (err) {
    res.status(400).send({ message: "Transaction verification failed." });
  }
});

app.get("/balances", (req, res) => {
  res.send(balances);
});


app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
