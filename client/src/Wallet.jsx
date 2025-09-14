import { keccak256 } from "ethereum-cryptography/keccak";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { useState } from "react";
import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, setPrivateKey }) {
  const [localPK, setLocalPK] = useState("");

  async function onChange(evt) {
    const pk = evt.target.value;
    setLocalPK(pk);
    setPrivateKey(pk);

    try {
      const publicKey = secp.getPublicKey(pk);
      const hash = keccak256(publicKey.slice(1)); // slice(1) removes 0x04 prefix
      const addr = "0x" + toHex(hash.slice(-20)); // last 20 bytes

      setAddress(addr);

      const {
        data: { balance },
      } = await server.get(`balance/${addr}`);
      setBalance(balance);
    } catch (e) {
      setBalance(0);
      setAddress("");
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Enter private key" value={localPK} onChange={onChange} />
      </label>

      <div>Address: {address}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;