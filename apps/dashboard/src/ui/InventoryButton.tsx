import './NavigationButton.css';

function InventoryButton() {
  return (
    <button className="nav-button">
      <div className={`nav-icon inventory`}>Icon</div>
      <span className="nav-label">Inventory</span>
    </button>
  );
}

export { InventoryButton };
