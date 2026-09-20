import { useEffect, useMemo, useState } from "react";
import { getMenu } from "../services/api";
import { useCart } from "../context/useCart";
import "./Menu.css";

const defaultCategories = ["All", "Snacks", "Meals", "Beverages"];

function CartIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3.5 4.5h2l1.7 10.1a1.8 1.8 0 0 0 1.8 1.5h7.9a1.8 1.8 0 0 0 1.7-1.3L20.5 8H6.3" /><circle cx="9.1" cy="19.1" r="1.2" /><circle cx="17.2" cy="19.1" r="1.2" /></svg>;
}

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>;
}

function openCart() {
  window.history.pushState({}, "", "/cart");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function FoodCard({ item, onAdd }) {
  const price = Number(item.price);
  return (
    <article className={`food-card${item.available ? "" : " food-card--unavailable"}`}>
      <div className="food-card__image">
        {item.imageUrl ? <img src={item.imageUrl} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : null}
        <span className="food-card__placeholder" aria-hidden="true">{item.name?.slice(0, 1).toUpperCase() || "F"}</span>
        {!item.available ? <span className="food-card__unavailable-label">Unavailable</span> : null}
      </div>
      <div className="food-card__content">
        <div><h2>{item.name}</h2><p className="food-card__description">{item.description || "Freshly prepared at Campus Canteen"}</p></div>
        <div className="food-card__footer"><strong>Rs. {Number.isFinite(price) ? price.toFixed(0) : item.price}</strong><button type="button" disabled={!item.available} onClick={() => onAdd(item)}>{item.available ? "Add" : "Closed"}</button></div>
      </div>
    </article>
  );
}

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addItem, itemCount } = useCart();

  useEffect(() => {
    getMenu()
      .then(setMenu)
      .catch(() => setError("We couldn't load the menu right now. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const actualCategories = menu.map((item) => item.category).filter(Boolean).filter((category, index, values) => values.indexOf(category) === index);
    return [...defaultCategories, ...actualCategories.filter((category) => !defaultCategories.includes(category))];
  }, [menu]);

  const filteredMenu = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return menu.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category?.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = !normalizedQuery || [item.name, item.description, item.category].filter(Boolean).some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, menu, query]);

  if (loading) return <main className="menu-page"><div className="menu-shell"><MenuHeader cartCount={itemCount} /><div className="menu-loading" role="status"><span className="loading-dot" />Finding today's favourites...</div></div></main>;
  if (error) return <main className="menu-page"><div className="menu-shell"><MenuHeader cartCount={itemCount} /><section className="menu-message" role="alert"><span className="menu-message__icon">!</span><h2>Menu is taking a moment</h2><p>{error}</p></section></div></main>;

  return (
    <main className="menu-page"><div className="menu-shell">
      <MenuHeader cartCount={itemCount} />
      <section className="menu-intro"><p className="menu-kicker">Good food, good mood</p><h1>What are you craving?</h1><label className="search-box"><SearchIcon /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for food items..." /></label></section>
      <nav className="category-list" aria-label="Food categories">{categories.map((category) => <button key={category} type="button" className={activeCategory === category ? "category-chip category-chip--active" : "category-chip"} onClick={() => setActiveCategory(category)}>{category}</button>)}</nav>
      <div className="menu-section-heading"><h2>Today's menu</h2><span>{filteredMenu.length} items</span></div>
      {filteredMenu.length ? <section className="food-grid" aria-label="Available food items">{filteredMenu.map((item) => <FoodCard key={item.itemId} item={item} onAdd={addItem} />)}</section> : <section className="menu-message menu-message--empty"><span className="menu-message__icon">?</span><h2>No bites found</h2><p>Try another search or choose a different category.</p></section>}
    </div></main>
  );
}

function MenuHeader({ cartCount }) {
  return <header className="menu-header"><div className="brand-mark" aria-hidden="true">CC</div><div className="brand-copy"><span>Campus</span><strong>Canteen</strong><small><i /> Open today</small></div><button type="button" className="cart-button" aria-label={`Cart with ${cartCount} items`} onClick={openCart}><CartIcon />{cartCount > 0 ? <b>{cartCount}</b> : null}</button></header>;
}