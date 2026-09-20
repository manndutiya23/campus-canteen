function StatusFilter({ activeFilter, onFilterChange }) {
  const filters = [
    { value: "ALL", label: "All" },
    { value: "ORDERED", label: "Placed" },
    { value: "PREPARING", label: "Cooking" },
    { value: "READY", label: "Ready" },
  ];

  return (
    <div className="filter-tabs">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={
            activeFilter === filter.value
              ? "filter-button active"
              : "filter-button"
          }
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default StatusFilter;