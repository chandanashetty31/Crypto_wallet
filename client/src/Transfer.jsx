import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import * as secp from "noble-secp256k1";
import { useState } from "react";
import server from "./server";

function Transfer({ setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const message = {
      amount: parseInt(sendAmount),
      recipient,
    };

    const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)));

    try {
      const [signature, recoveryBit] = await secp.sign(messageHash, privateKey, {
        recovered: true,
      });

      const {
        data: { balance },
      } = await server.post("send", {
        message,
        signature: toHex(signature),
        recoveryBit,
      });

      setBalance(balance);
    } catch (ex) {
      alert(ex.response?.data?.message || "Transfer failed.");
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Amount
        <input value={sendAmount} onChange={setValue(setSendAmount)} />
      </label>

      <label>
        Recipient Address
        <input value={recipient} onChange={setValue(setRecipient)} />
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;