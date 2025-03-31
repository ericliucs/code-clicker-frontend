import Big from "big.js";
import { createContext, useContext, useReducer } from "react";

export const LoCPerSecondContext = createContext(new Big(0));
export const LoCPerSecondDispatchContext = createContext(null);

const initialLoCPerSecond = Big(0);

export function LoCPerSecondProvider({ children }) {
  const [LoCPerSecond, LoCPerSecondDispatch] = useReducer(
    LoCPerSecondReducer,
    initialLoCPerSecond
  );
  return (
    <LoCPerSecondContext.Provider value={LoCPerSecond}>
      <LoCPerSecondDispatchContext.Provider value={LoCPerSecondDispatch}>
        {children}
      </LoCPerSecondDispatchContext.Provider>
    </LoCPerSecondContext.Provider>
  );
}

function LoCPerSecondReducer(LoCPerSecond, action) {
  switch (action.type) {
    case "increase":
      return LoCPerSecond.add(action.amount);
    case "set":
      console.log("Directly setting LoCPerSecond!");
      return Big(action.amount.toString());
    default:
      return LoCPerSecond;
  }
}

export function useLoCPerSecond() {
  return useContext(LoCPerSecondContext);
}

export function useLoCPerSecondDispatch() {
  return useContext(LoCPerSecondDispatchContext);
}
