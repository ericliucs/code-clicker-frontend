import Big from "big.js";
import { createContext, useContext, useReducer } from "react";

export const LoCOnClickContext = createContext(new Big(1));
export const LoCOnClickDispatchContext = createContext(null);

const initialLoCOnClick = Big(1);

export function LoCOnClickProvider({ children }) {
  const [LoCOnClick, LoCOnClickDispatch] = useReducer(
    LoCOnClickReducer,
    initialLoCOnClick
  );
  return (
    <LoCOnClickContext.Provider value={LoCOnClick}>
      <LoCOnClickDispatchContext.Provider value={LoCOnClickDispatch}>
        {children}
      </LoCOnClickDispatchContext.Provider>
    </LoCOnClickContext.Provider>
  );
}

function LoCOnClickReducer(LoCPerSecond, action) {
  switch (action.type) {
    case "increase":
      return LoCPerSecond.add(action.amount);
    default:
      return LoCPerSecond;
  }
}

export function useLoCOnClick() {
  return useContext(LoCOnClickContext);
}

export function useLoCOnClickDispatch() {
  return useContext(LoCOnClickDispatchContext);
}
