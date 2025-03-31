export default function UpgradeTooltip({
  upgradeTitle,
  upgradeCost,
  upgradeDescription,
}) {
  return (
    <span
      className="
          absolute
          hidden
          group-hover:block
          top-full
          left-1/2
          -translate-x-1/2
          mt-1
          p-2
          text-white
          bg-gray-800
          text-sm
          rounded
          shadow
          min-w-52
          max-w-3xl
          whitespace-normal
          z-[500]
        "
      onMouseEnter={(e) => {
        // Get tooltip and screen dimensions
        const tooltip = e.currentTarget;
        const tooltipRect = tooltip.getBoundingClientRect();
        const screenWidth = window.innerWidth;

        if (tooltipRect.right > screenWidth - 10) {
          const overflow = tooltipRect.right - screenWidth + 10;
          tooltip.style.transform = `translateX(calc(-50% - ${overflow}px))`;
        } else if (tooltipRect.left < 10) {
          const overflow = 10 - tooltipRect.left;
          tooltip.style.transform = `translateX(calc(-50% + ${overflow}px))`;
        }
      }}
    >
      <div className="flex justify-between items-center mb-2 border-b pb-1">
        <span className="font-bold">{upgradeTitle}</span>
        <span className="text-yellow-400">{upgradeCost} LoC</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: upgradeDescription }}></div>
    </span>
  );
}
