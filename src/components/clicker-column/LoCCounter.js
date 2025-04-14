import { useLoC } from "../contexts/LoCContext";
import numeral from "numeral";

export default function LoCCounter() {
  const LoC = useLoC();
  
  return <h1 className={"mt-8 text-5xl font-bold"}>{`${numeral(LoC.toString()).format("0.[0]a")} LoC`}</h1>;
}
