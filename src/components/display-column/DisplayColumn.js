import SaveButton from "./SaveButton";
import LoadButton from "./LoadButton";
import LoginButton from "./LoginButton";
import Leaderboard from "./Leaderboard";

export default function DisplayColumn() {
  return (
    <div className={"basis-1/3"}>
      <LoginButton />
      <SaveButton />
      <LoadButton />
      <Leaderboard />
    </div>
  );
}
