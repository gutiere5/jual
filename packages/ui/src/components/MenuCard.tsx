import type { Item } from "@repo/types/item.schema";
import "./MenuCard.css";

function MenuCard(item: Item) {
  return (
    <div className="menu-card">
      <div className="item-image-container">
        <img className="item-image" src={item.image_url} alt={item.name} />
      </div>
      <div className="item-description">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-details">{item.description}</p>
        <p className="item-price">${item.price}</p>
      </div>
    </div>
  );
}

export default MenuCard;
