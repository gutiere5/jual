import { useLoaderData } from "react-router-dom";
import "./MeatDisplay1.css";
import type { Item } from "@repo/types/item.schema";

function MeatDisplay1() {
  const items = useLoaderData() as Item[];

  return (
    <>
      {/* Main Content Grid */}

      <div className="menu-grid">
        {items.map((item) => {
          return (
            <div className="menu-item large" key={item.id}>
              <div className="item-image-wrapper">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="item-image"
                />
                <div className="image-overlay"></div>
                <div className="price-badge">{item.price}</div>
              </div>
              <div className="item-content">
                <div className="item-header">
                  <h2 className="item-name">{item.name}</h2>
                </div>
                {item.ingredients && (
                  <p className="item-ingredients">{item.ingredients}</p>
                )}
                {/* item.meats && (
                  <div className="meat-choices">
                    <p className="meat-label">Choice of Meat:</p>
                    <ul className="meat-list">
                      {item.category!.map((category, idx) => (
                        <li key={idx}>• {category}</li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MeatDisplay1;
