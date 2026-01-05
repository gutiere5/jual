import { useLoaderData, useNavigate } from 'react-router-dom';
import type { Item } from '../types';
import { itemService } from '../services/itemServices';

export async function contentItemsLoader() {
  const items = await itemService.getAll();
  return items;
}

function ContentContainer() {
  const items = useLoaderData() as Item[];
  const navigate = useNavigate();

  return (
    <main>
      <div className="items-content-container">
        <h1>Inventory</h1>
        <p>Manage stock levels and item details</p>{' '}
        {items.map((item) => {
          return (
            <button key={item.id} onClick={() => navigate(`/items/${item.id}`)}>
              <h3>{item.name}</h3>
              <div className="item-content-description">
                <span>SKU: {item.sku}</span>
                <span>UOM: {item.uom}</span>
                <span>Low Stock Threshold: {item.low_stock_threshold}</span>
              </div>
            </button>
          );
        })}
      </div>
    </main>
  );
}

export default ContentContainer;
