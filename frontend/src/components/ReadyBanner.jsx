function ReadyBanner({ orderId }) {
  return (
    <div className="ready-banner">
      <span className="ready-banner-icon">🔔</span>
      <div>
        <strong>Your order is ready!</strong>
        <p>Order {orderId} is ready for pickup. Head to the canteen to collect it.</p>
      </div>
    </div>
  );
}

export default ReadyBanner;
