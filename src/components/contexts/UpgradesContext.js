import { createContext, useContext, useReducer } from "react";

import { useLoC, useLoCDispatch } from "./LoCContext";
import { useLoCPerSecondDispatch } from "./LoCPerSecondContext";
import Big from "big.js";

import youtubeLogo from "../../assets/images/upgrades/youtube-logo.png";
import typingSpeed from "../../assets/images/upgrades/typing-speed.png";
import { useLoCOnClickDispatch } from "./LoCOnClickContext";

export const UpgradesContext = createContext(new Map());
export const UpgradesDispatchContext = createContext(null);

const initialUpgrades = new Map([
  [
    1,
    {
      name: "Watch YouTube Video",
      src: youtubeLogo,
      alt: "The Watch YouTube Video upgrade.",
      description:
        "<p>You gain +0.1 LoC/s.</p>" +
        "<p><i>You've seen a few coding videos on YouTube in your recommended section -" +
        " maybe watching a few wouldn't hurt?</i></p>",
      cost: Big(50),
      visible: true,
      purchased: false,
      effects: [
        {
          increaseLoCPerSecond: 0.1,
        },
      ],
    },
  ],
  [
    2,
    {
      name: "Watch YouTube Video II",
      src: youtubeLogo,
      alt: "The Watch YouTube Video II upgrade.",
      description:
        "<p>You gain +0.2 LoC/s.</p>" +
        "<p><i>These YouTube videos have been pretty handy! Now you can form all of your" +
        " opinions based solely on what tech influencers say. Just like every good" +
        " programmer!</i></p>",
      cost: Big(150),
      visible: true,
      purchased: false,
      effects: [
        {
          increaseLoCPerSecond: 0.2,
        },
      ],
    },
  ],
  [
    3,
    {
      name: "Watch YouTube Video III",
      src: youtubeLogo,
      alt: "The Watch YouTube Video III upgrade.",
      description:
        "<p>You gain +0.2 LoC/s.</p>" +
        "<p><i>Your recommeded sections are nothing but coding videos. There's no room for" +
        " anything else. The YouTube algorithm has you now.</i></p>",
      cost: Big(400),
      visible: true,
      purchased: false,
      effects: [
        {
          increaseLoCPerSecond: 0.2,
        },
      ],
    },
  ],
  [
    4,
    {
      name: "Learn Basic Typing",
      src: typingSpeed,
      alt: "The Typing Speed upgrade.",
      description:
        "<p>You gain +0.5 LoC every click.</p>" +
        "<p><i>Come to think of it, everyone seems to be typing a lot faster than you do. " +
        "Guess you'd better learn how to type fast.</i></p>",
      cost: Big(300),
      visible: true,
      purchased: false,
      effects: [
        {
          increaseLoCOnClick: Big(0.5),
        },
      ],
    },
  ],
  [
    5,
    {
      name: "Improve Typing",
      src: typingSpeed,
      alt: "The Improve Typing upgrade.",
      description:
        "<p>You gain +0.5 LoC every click.</p>" +
        "<p><i>Compared to how you used to peck at your keyboard, you're flying! Sure," +
        " you still make a typo every few words or so, but at leasdt you're gettijng" +
        " better!</i></p>",
      cost: Big(1000),
      visible: true,
      purchased: false,
      effects: [
        {
          increaseLoCOnClick: Big(0.5),
        },
      ],
    },
  ],
  [
    6,
    {
      name: "Clean Typing",
      src: typingSpeed,
      alt: "The Clean Typing upgrade.",
      description:
        "<p>You gain +0.5 LoC every click.</p>" +
        "<p><i>Congratulations on being able to type at an average speed! You've joined" +
        " the prestigious few who can type with all of their fingers - the top... 88% of" +
        " people. Oh.</i></p>",
      cost: Big(3000),
      visible: true,
      purchased: false,
      effects: [
        {
          increaseLoCOnClick: Big(0.5),
        },
      ],
    },
  ],
  [
    7,
    {
      name: "No Look Typing",
      src: typingSpeed,
      alt: "The No Look Typing upgrade.",
      description:
        "<p>You gain +0.5 LoC every click.</p>" +
        "<p><i>You've gotten familiar enough to keep your eyes on the screen instead of" +
        " looking down at your keyboard. Look ma, no eyes!</i></p>",
      cost: Big(5000),
      visible: true,
      purchased: false,
      effects: [
        {
          increaseLoCOnClick: Big(0.5),
        },
      ],
    },
  ],
  [
    8,
    {
      name: "Speed Typing I",
      src: typingSpeed,
      alt: "The Speed Typing I upgrade.",
      description:
        "<p>You gain +1 LoC every click.</p>" +
        "<p><i>You've gotten so fast that you can now impress everyone around you! At" +
        " least, that's what you think. In reality, you just annoy people in libraries.</i></p>",
      cost: Big(10000),
      visible: true,
      purchased: false,
      effects: [
        {
          increaseLoCOnClick: Big(1),
        },
      ],
    },
  ],
  [
    9,
    {
      name: "Speed Typing II",
      src: typingSpeed,
      alt: "The Speed Typing II upgrade.",
      description:
        "<p>You gain +1 LoC every click.</p>" +
        "<p><i>Your blazing speed has started to wear down the keys on your keyboard. No" +
        " matter. You've stocked up a drawer full of replacement keycaps.</i></p>",
      cost: Big(15000),
      visible: true,
      purchased: false,
      effects: [
        {
          increaseLoCOnClick: Big(1),
        },
      ],
    },
  ],
]);

export function UpgradesProvider({ children }) {
  const LoC = useLoC();
  const LoCDispatch = useLoCDispatch();
  const LoCOnClickDispatch = useLoCOnClickDispatch();
  const LoCPerSecondDispatch = useLoCPerSecondDispatch();

  const [upgrades, dispatch] = useReducer(upgradesReducer, initialUpgrades);

  function purchaseUpgrade(upgradeID) {
    const upgrade = upgrades.get(upgradeID);

    if (!LoC.lt(upgrade.cost) && upgrade) {
      dispatch({ type: "purchase", upgradeID: upgradeID });
      LoCDispatch({ type: "decrease", amount: upgrade.cost });

      for (const effect of upgrade.effects) {
        if (effect.increaseLoCPerSecond) {
          LoCPerSecondDispatch({
            type: "increase",
            amount: Big(effect.increaseLoCPerSecond),
          });
        }
        if (effect.increaseLoCOnClick) {
          LoCOnClickDispatch({
            type: "increase",
            amount: Big(effect.increaseLoCOnClick),
          });
        }
      }
    }
  }

  function setAllUpgrades(upgradesData) {
    dispatch({ type: "set", upgrades: upgradesData });
  }

  return (
    <UpgradesContext.Provider value={upgrades}>
      <UpgradesDispatchContext.Provider
        value={{ purchaseUpgrade, setAllUpgrades }}
      >
        {children}
      </UpgradesDispatchContext.Provider>
    </UpgradesContext.Provider>
  );
}

function upgradesReducer(upgrades, action) {
  switch (action.type) {
    case "purchase":
      console.log(action);
      upgrades.get(action.upgradeID).purchased = true;
      return upgrades;
    case "set":
      return convertUpgradesArrayToMap(action.upgrades);
    default:
      return upgrades;
  }
}

function convertUpgradesArrayToMap(upgradesArray) {
  const newUpgrades = new Map();

  for (const [id, upgradeData] of upgradesArray) {
    newUpgrades.set(id, upgradeData);
  }

  return newUpgrades;
}

export function useUpgrades() {
  return useContext(UpgradesContext);
}

export function useUpgradesDispatch() {
  return useContext(UpgradesDispatchContext);
}
