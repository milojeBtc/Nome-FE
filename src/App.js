// import logo from './logo.svg';
import "./App.css";
import { useState } from "react";
import Body from "./layout/Body";
import Header from "./layout/Header";

import { UserContext } from "./Context/UserContext";

function App() {
  const [paymentAddress, setPaymentAddress] = useState("");
  const [ordinalsAddress, setOrdinalsAddress] = useState("");
  const [paymentPublicKey, setPaymentPublicKey] = useState("");
  const [ordinalsPublicKey, setOrdinalsPublicKey] = useState("");
  const [useWallet, setUseWallet] = useState(0);
  const [paymentDerivationPath, setPaymentDerivationPath] = useState("");
  const [ordinalDerivationPath, setOrdinalDerivationPath] = useState("");

  return (
    <UserContext.Provider
      value={{
        paymentAddress,
        setPaymentAddress,
        ordinalsAddress,
        setOrdinalsAddress,
        paymentPublicKey,
        setPaymentPublicKey,
        ordinalsPublicKey,
        setOrdinalsPublicKey,
        useWallet,
        setUseWallet,
        paymentDerivationPath,
        setPaymentDerivationPath,
        ordinalDerivationPath,
        setOrdinalDerivationPath,
      }}
    >
      <div className="bg-black max-w-[2000px] mx-auto">
        <Header />
        <Body />
      </div>
    </UserContext.Provider>
  );
}

export default App;
