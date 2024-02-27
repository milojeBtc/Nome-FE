import { createContext, useContext } from "react";

export const UserContext = createContext({
  paymentAddress: "",
  setPaymentAddress: () => {},
  paymentPublicKey: "",
  setPaymentPublicKey: () => {},
  ordinalsAddress: "",
  setOrdinalsAddress: () => {},
  ordinalsPublicKey: "",
  setOrdinalsPublicKey: () => {},
  useWallet: 0,
  setUseWallet: () => {},
  paymentDerivationPath: "",
  setPaymentDerivationPath: () => {},
  ordinalDerivationPath: "",
  setOrdinalDerivationPath: () => {},
});

export const useUserContext = () => useContext(UserContext);
