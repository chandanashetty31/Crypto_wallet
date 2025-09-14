const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

// Function to derive Ethereum-style address from private key
function getAddress(privateKey) {
  const publicKey = secp.getPublicKey(privateKey);
  const hash = keccak256(publicKey.slice(1)); // drop 0x04
  return "0x" + toHex(hash.slice(-20));       // last 20 bytes
}

for (let i = 1; i <= 3; i++) {
  const privateKey = secp.utils.randomPrivateKey();
  const address = getAddress(privateKey);

  console.log(`Wallet ${i}`);
  console.log(`Private Key: ${toHex(privateKey)}`);
  console.log(`Address:     ${address}`);
}