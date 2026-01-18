import { Form, redirect, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { itemService } from '../../services/itemServices';
import { Grid3x3, List, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import './ItemInventory.css';
import type { Item } from '@repo/types/item.schema';

export const inventoryItemsLoader = async () => {
  const items = await itemService.getAll();
  return items;
};

export const inventoryItemsAction = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const itemId = formData.get('itemId');

  return redirect(`/items/${itemId}`);
};

const ItemInventoryContainer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const items = useLoaderData() as Item[];

  const filteredItems = useMemo(() => {
    if (!items) return [];
    if (!searchQuery.trim()) {
      return items;
    }

    const query = searchQuery.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(query));
  }, [items, searchQuery]);

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: 'Out of Stock', variant: 'destructive' };
    if (quantity < 20) return { label: 'Low Stock', variant: 'outline' };
    return { label: 'In Stock', variant: 'secondary' };
  };
  return (
    <main>
      <div className="inventory-container">
        <div className="inventory-wrapper">
          {/* Header Section */}
          <div className="inventory-header">
            <div className="inventory-header-title ">
              <h1>Inventory Management</h1>
            </div>
            <p className="inventory-description">Track and Manage Stock Levels and Item Details</p>
            {/* Search and Filters Bar */}
            <div className="inventory-search-bar">
              <div className="inventory-search-wrapper">
                <Search className="inventory-search-icon" />
                <input
                  type="text"
                  placeholder="Search by name, category, or SKU..."
                  className="inventory-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="inventory-view-toggles">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  aria-label="Grid View"
                >
                  <Grid3x3 />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  aria-label="List View"
                >
                  <List />
                </button>
              </div>
            </div>
          </div>

          {/* Item Grid/List */}
          {viewMode === 'grid' ? (
            <div className="inventory-grid">
              {filteredItems.map((item) => {
                const stockStatus = getStockStatus(item.quantity_remaining);
                return (
                  <Form method="post" key={item.id}>
                    <input type="hidden" name="itemId" value={item.id} />
                    <button type="submit" className="inventory-item-card ">
                      <div className="inventory-item-content">
                        <div className="inventory-item-grid-layout">
                          <div className="inventory-item-image-wrapper">
                            <div className="inventory-item-image">
                              <img
                                src={`https://picsum.photos/seed/${item.name}/160`}
                                alt={item.name}
                              />
                            </div>
                          </div>
                          <div className="inventory-item-details">
                            <h3>{item.name}</h3>
                            <div className="inventory-item-badges">
                              <span className="badge outline">{item.category}</span>
                              <span className={`badge ${stockStatus.variant}`}>
                                {stockStatus.label}
                              </span>
                            </div>
                            <div className="inventory-item-quantity">
                              <span>Qty:</span>
                              <span>{item.quantity_remaining}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </Form>
                );
              }) || <p>No Items Found</p>}
            </div>
          ) : (
            <div className="inventory-list">
              {filteredItems.map((item) => {
                const stockStatus = getStockStatus(item.quantity_remaining);
                return (
                  <div key={item.id} className="inventory-item-card list-view">
                    <div className="inventory-item-content">
                      <div className="inventory-item-list-layout">
                        <div className="inventory-item-image-wrapper">
                          <div className="inventory-item-image small">
                            <img
                              src={`https://picsum.photos/seed/${item.name}/128`}
                              alt={item.name}
                            />
                          </div>
                        </div>

                        <div className="inventory-item-list-grid">
                          <div className="inventory-item-name-col">
                            <h3>{item.name}</h3>
                            <span className="badge outline">{item.category}</span>
                          </div>

                          <div className="inventory-item-quantity">
                            <span>Quantity:</span>
                            <span>{item.quantity_remaining}</span>
                          </div>

                          <div className="inventory-item-status-col">
                            <span className={`badge ${stockStatus.variant}`}>
                              {stockStatus.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="inventory-empty-state">
              <h3>No items found</h3>
              <p>Try adjusting your search to find what you&apos;re looking for</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ItemInventoryContainer;
