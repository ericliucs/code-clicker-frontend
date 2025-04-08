import { useState, useEffect, useRef } from "react";
import { useLoCDispatch } from "../contexts/LoCContext";
import { useLoCOnClick } from "../contexts/LoCOnClickContext";
import Big from "big.js";
import soundManager from "../../managers/SoundManager"
import lightbulb from "../../assets/images/events/lightbulb.png";

export default function EurekaMoment() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clickPopups, setClickPopups] = useState([]);
  const LoCDispatch = useLoCDispatch();
  const LoCPerClick = useLoCOnClick();
  const hideTimerRef = useRef(null);
  const appearTimerRef = useRef(null);
  const [randomEurekaMomentTextIndex, setRandomEurekaMomentTextIndex] =
    useState(0);

  const eurekaMomentTexts = [
    "Eureka!",
    "A great idea!",
    "A breakthrough idea!",
    "Finally found that bug!",
    "A burst of inspiration!"
  ];

  useEffect(() => {
    if (clickPopups.length > 0) {
      const timer = setTimeout(() => {
        setClickPopups((popups) => popups.slice(1));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [clickPopups]);

  useEffect(() => {
    const initialDelay = Math.random() * 10000 + 5000;
    appearTimerRef.current = setTimeout(makeAppear, initialDelay);

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      if (appearTimerRef.current) {
        clearTimeout(appearTimerRef.current);
      }
    };
  }, []);

  const generateRandomPosition = () => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    return { x, y };
  };

  const handleClick = () => {
    soundManager.play("eurekaMoment");
    
    // Select a random text message
    const randomIndex = Math.floor(Math.random() * eurekaMomentTexts.length);
    setRandomEurekaMomentTextIndex(randomIndex);

    const bonusMultiplier = Big(Math.floor(Math.random() * 150) + 50);
    const bonus = LoCPerClick.times(bonusMultiplier);

    const newPopup = {
      id: Date.now(),
      x: position.x + 30,
      y: position.y - 20,
      value: `+${bonus}`,
      text: eurekaMomentTexts[randomIndex],
    };

    setClickPopups((popups) => [...popups, newPopup]);

    LoCDispatch({
      type: "increase",
      amount: bonus.gt(50) ? bonus : Big(50),
    });

    setIsVisible(false);

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    scheduleNextAppearance();
  };

  const makeAppear = () => {
    setPosition(generateRandomPosition());
    setIsVisible(true);

    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      scheduleNextAppearance();
    }, 10000);
  };

  const scheduleNextAppearance = () => {
    // Random time between 30 seconds and 2 minutes
    const nextAppearanceDelay = Math.random() * 90000 + 30000;

    if (appearTimerRef.current) {
      clearTimeout(appearTimerRef.current);
    }
    appearTimerRef.current = setTimeout(makeAppear, nextAppearanceDelay);
  };

  return (
    <>
      {isVisible && (
        <div
          className="fixed rounded-full w-16 h-16 cursor-pointer z-50 flex items-center justify-center text-2xl font-bold text-white shadow-lg"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            background: "radial-gradient(circle, #ffd700 0%, #b8860b 100%)",
            boxShadow: "0 0 20px 5px rgba(255, 215, 0, 0.7)",
            textShadow: "0 0 5px #000",
            animation: "pulse 2s infinite",
          }}
          onClick={handleClick}
        >
          <img src={lightbulb} alt="Lightbulb icon" />
        </div>
      )}

      {/* Render popups */}
      {clickPopups.map((popup) => (
        <div
          key={popup.id}
          className="fixed pointer-events-none text-yellow-400 font-bold text-xl animate-float-up z-50"
          style={{
            left: `${popup.x}px`,
            top: `${popup.y}px`,
            textAlign: "center",
          }}
        >
          <p>{popup.text}</p>
          <p>{`${popup.value} LoC!`}</p>
        </div>
      ))}
    </>
  );
}
