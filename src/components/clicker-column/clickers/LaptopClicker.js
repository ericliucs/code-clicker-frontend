import { useState, useEffect } from "react";
import { useLoCDispatch } from "../../contexts/LoCContext";
import { useLoCOnClick } from "../../contexts/LoCOnClickContext";
import laptopClickerImage from "../../../laptop-clicker.png";

export default function LaptopClicker() {
  const LoCPerClick = useLoCOnClick();
  const LoCDispatch = useLoCDispatch();
  const [clickPopups, setClickPopups] = useState([]);

  // Cleanup effect to remove old popups
  useEffect(() => {
    if (clickPopups.length > 0) {
      const timer = setTimeout(() => {
        // Remove the oldest popup after animation completes
        setClickPopups((popups) => popups.slice(1));
      }, 1000); // Animation duration

      return () => clearTimeout(timer);
    }
  }, [clickPopups]);

  const handleClick = (event) => {
    // Get click position relative to the target element
    const rect = event.currentTarget.getBoundingClientRect();
    // Temporary random offsets while I fix this
    const x = event.clientX - rect.left - 18;
    const y = event.clientY - rect.top - 30;

    const newPopup = {
      id: Date.now(),
      x,
      y,
      value: `+${LoCPerClick}`,
    };

    setClickPopups((popups) => [...popups, newPopup]);
    LoCDispatch({ type: "increase", amount: LoCPerClick });
  };

  // Prevent dragging
  const preventDrag = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="relative">
      <img
        className="clicker w-[300px] h-[300px] transition ease-in-out hover:scale-110"
        src={laptopClickerImage}
        alt="Computer clicker button."
        onClick={handleClick}
        onDragStart={preventDrag}
        onMouseDown={preventDrag}
        draggable="false"
        style={{
          WebkitUserDrag: "none",
          KhtmlUserDrag: "none",
          MozUserDrag: "none",
          OUserDrag: "none",
          userDrag: "none",
          touchAction: "manipulation" // Helps with mobile devices
        }}
      />

      {/* Render all active popups */}
      {clickPopups.map((popup) => (
        <div
          key={popup.id}
          className="absolute pointer-events-none font-bold text-2xl animate-float-up"
          style={{
            left: `${popup.x}px`,
            top: `${popup.y}px`,
          }}
        >
          {popup.value}
        </div>
      ))}
    </div>
  );
}