import { useCart } from "../context/useCart";
import "./Cart.css";

export default function Payment() {
  const { total } = useCart();
  return <main className="cart-page"><div className="cart-shell"><header className="cart-header"><button type="button" className="back-button" onClick={() => { window.history.back(); }} aria-label="Back to cart">&#8592;</button><div className="cart-brand"><span>Campus</span><strong>Canteen</strong></div></header><section className="empty-cart" style={{ marginTop: "42px" }}><div className="empty-cart__icon">...</div><h2>Payment is coming soon</h2><p>Your order total is Rs. {total.toFixed(0)}. Online payment will be available here shortly.</p><button type="button" className="pay-button" onClick={() => { window.history.pushState({}, "", "/cart"); window.dispatchEvent(new PopStateEvent("popstate")); }}>Back to Cart</button></section></div></main>;
}