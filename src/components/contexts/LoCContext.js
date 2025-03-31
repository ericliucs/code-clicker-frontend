import Big from "big.js";
import { createContext, useContext, useReducer } from "react";

export const LoCContext = createContext(new Big(0));
export const LoCDispatchContext = createContext(null);

const initialLoC = Big(0);

export function LoCProvider({ children }) {
  const [LoC, LoCDispatch] = useReducer(LoCReducer, initialLoC);
  return (
    <LoCContext.Provider value={LoC}>
      <LoCDispatchContext.Provider value={LoCDispatch}>
        {children}
      </LoCDispatchContext.Provider>
    </LoCContext.Provider>
  );
}

function LoCReducer(LoC, action) {
  switch (action.type) {
    case "increase":
      return LoC.add(action.amount);
    case "decrease":
      return LoC.minus(action.amount);
    case "set":
      console.log("directly setting LoC");
      return Big(action.amount.toString());
    default:
      return LoC;
  }
}

export function useLoC() {
  return useContext(LoCContext);
}

export function useLoCDispatch() {
  return useContext(LoCDispatchContext);
}
