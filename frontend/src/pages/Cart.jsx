import { useCart } from "../context/useCart";
import "./Cart.css";

function ArrowIcon({ direction = "left" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={direction === "left" ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"} /></svg>;
}

function CartIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3.5 4.5h2l1.7 10.1a1.8 1.8 0 0 0 1.8 1.5h7.9a1.8 1.8 0 0 0 1.7-1.3L20.5 8H6.3" /><circle cx="9.1" cy="19.1" r="1.2" /><circle cx="17.2" cy="19.1" r="1.2" /></svg>;
}

function goTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function CartItem({ entry, onIncrease, onDecrease, onRemove }) {
  const { item, quantity } = entry;
  const price = Number(item.price);
  return (
    <article className="cart-item">
      <div className="cart-item__image">
        {item.imageUrl ? <img src={item.imageUrl} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : null}
        <span aria-hidden="true">{item.name?.slice(0, 1).toUpperCase() || "F"}</span>
      </div>
      <div className="cart-item__body">
        <div className="cart-item__heading"><div><h2>{item.name}</h2><p>Rs. {price.toFixed(0)} each</p></div><button type="button" className="remove-button" onClick={() => onRemove(item.itemId)} aria-label={`Remove ${item.name}`}>Remove</button></div>
        <div className="cart-item__footer"><div className="quantity-control"><button type="button" onClick={() => onDecrease(item.itemId)} aria-label={`Decrease ${item.name}`}>-</button><strong>{quantity}</strong><button type="button" onClick={() => onIncrease(item.itemId)} aria-label={`Increase ${item.name}`}>+</button></div><strong className="cart-item__subtotal">Rs. {(price * quantity).toFixed(0)}</strong></div>
      </div>
    </article>
  );
}

export default function Cart() {
  const { items, itemCount, total, increaseItem, decreaseItem, removeItem } = useCart();

  return (
    <main className="cart-page"><div className="cart-shell">
      <header className="cart-header"><button type="button" className="back-button" onClick={() => goTo("/")} aria-label="Back to menu"><ArrowIcon /></button><div className="cart-brand"><span>Campus</span><strong>Canteen</strong></div><div className="cart-header__count"><CartIcon /><b>{itemCount}</b></div></header>
      <section className="cart-intro"><p className="menu-kicker">Almost there</p><h1>Your cart</h1><p>{itemCount ? `${itemCount} ${itemCount === 1 ? "item" : "items"} ready to order` : "Your tray is waiting for something delicious"}</p></section>
      {items.length ? <>
        <section className="cart-items" aria-label="Cart items">{items.map((entry) => <CartItem key={entry.item.itemId} entry={entry} onIncrease={increaseItem} onDecrease={decreaseItem} onRemove={removeItem} />)}</section>
        <section className="cart-summary"><div><span>Subtotal</span><strong>Rs. {total.toFixed(0)}</strong></div><div><span>Service fee</span><span className="cart-summary__muted">Calculated at counter</span></div><div className="cart-total"><strong>Total</strong><strong>Rs. {total.toFixed(0)}</strong></div><button type="button" className="pay-button" onClick={() => goTo("/payment")}>Proceed to Pay <ArrowIcon direction="right" /></button><button type="button" className="continue-button" onClick={() => goTo("/")}><ArrowIcon /> Continue Ordering</button></section>
      </> : <section className="empty-cart"><div className="empty-cart__icon"><CartIcon /></div><h2>Your cart is empty</h2><p>Add something tasty from today's menu and it will appear here.</p><button type="button" className="pay-button" onClick={() => goTo("/")}>Browse Menu <ArrowIcon direction="right" /></button></section>}
    </div></main>
  );
}