function PickupCodeCard({ pickupCode, emphasized }) {
  return (
    <div className={`pickup-code-card${emphasized ? " pickup-code-card-emphasized" : ""}`}>
      <span className="pickup-code-label">Pickup Code</span>
      <span className="pickup-code-value">{pickupCode}</span>
      <p className="pickup-code-hint">Show this code to the staff when collecting your order.</p>
    </div>
  );
}

export default PickupCodeCard;
