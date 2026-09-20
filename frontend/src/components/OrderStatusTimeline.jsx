const STEPS = [
  { status: "ORDERED", label: "Placed" },
  { status: "PREPARING", label: "Cooking" },
  { status: "READY", label: "Ready" },
  { status: "COLLECTED", label: "Collected" },
];

function OrderStatusTimeline({ status }) {
  const currentIndex = STEPS.findIndex((step) => step.status === status);

  return (
    <div className="status-timeline">
      {STEPS.map((step, index) => {
        const state =
          index < currentIndex
            ? "done"
            : index === currentIndex
            ? "current"
            : "upcoming";

        return (
          <div className={`timeline-step timeline-step-${state}`} key={step.status}>
            <div className="timeline-dot" />
            <span>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default OrderStatusTimeline;
