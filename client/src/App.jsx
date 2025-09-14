import { useState } from "react";
import "./App.scss";
import Transfer from "./Transfer";
import Wallet from "./Wallet";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
       <h1 style={{ textAlign: "center", marginBottom: "20px" ,width: "100%",fontSize: "2.5rem", color: "rgb(15, 163, 160)"}}>
        My Crypto Wallet
      </h1>
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        setPrivateKey={setPrivateKey}
      />
      <Transfer setBalance={setBalance} privateKey={privateKey} />
    </div>
  );
}

export default App;