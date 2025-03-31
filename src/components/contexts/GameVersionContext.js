import { createContext, useContext } from "react";

export const GameVersionContext = createContext("v0.01");

export function useGameVersion() {
  return useContext(GameVersionContext);
}
