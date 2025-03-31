import { useLoCPerSecond } from "../contexts/LoCPerSecondContext";

export default function LoCPerSecondCounter() {
  const LoCPerSecond = useLoCPerSecond();

  return (
    <h1 className={"my-8 text-5xl font-bold"}>{`${LoCPerSecond} LoC/s`}</h1>
  );
}
