import LoCCounter from "./LoCCounter";
import LaptopClicker from "./clickers/LaptopClicker";
import LoCPerSecondCounter from "./LoCPerSecondCounter";

export default function ClickerColumn({ LoC, setLoC, LoCPerSecond }) {
  return (
    <div className="basis-1/3 flex flex-col items-center w-full">
      <LoCCounter LoC={LoC} />
      <LoCPerSecondCounter LoCPerSecond={LoCPerSecond} />
      <LaptopClicker setLoC={setLoC} />
    </div>
  );
}
