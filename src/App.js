import Big from "big.js";
import { useEffect } from "react";

import ClickerColumn from "./components/clicker-column/ClickerColumn";
import { useLoC, useLoCDispatch } from "./components/contexts/LoCContext";
import { useLoCPerSecond } from "./components/contexts/LoCPerSecondContext";
import DisplayColumn from "./components/display-column/DisplayColumn";
import PurchaseColumn from "./components/purchase-column/PurchaseColumn";

import "./App.css";
import EurekaMoment from "./components/events/EurekaMoment";
import soundManager from "./managers/SoundManager";

export default function App() {
  const LOC_PER_SECOND_DELAY_FACTOR = Big(0.1);
  const TICK_DELAY_MS = Big(100);

  const LoC = useLoC();
  const LoCDispatch = useLoCDispatch();
  const LoCPerSecond = useLoCPerSecond();

  useEffect(() => {
    Big.PE = 1e+6;
    const interval = setInterval(() => {
      LoCDispatch({
        type: "increase",
        amount: LoCPerSecond.times(LOC_PER_SECOND_DELAY_FACTOR),
      });
    }, TICK_DELAY_MS);
    return () => clearInterval(interval);
  }, [LoCPerSecond]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      soundManager.playMusic();
    }, 500);

    return () => {
      clearTimeout(timeout);
      soundManager.stopMusic();
    };
  }, []);

  return (
    <div id={"app"} className="flex w-full h-dvh font-inter text-[#eeeeee]">
      <DisplayColumn />
      <ClickerColumn LoC={LoC} LoCPerSecond={LoCPerSecond} />
      <PurchaseColumn />
      <EurekaMoment />
    </div>
  );
}