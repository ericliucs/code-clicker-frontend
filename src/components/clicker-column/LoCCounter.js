import { useLoC } from "../contexts/LoCContext";

export default function LoCCounter() {
  const LoC = useLoC();
  
  return <h1 className={"mt-8 text-5xl font-bold"}>{`${LoC} LoC`}</h1>;
}
