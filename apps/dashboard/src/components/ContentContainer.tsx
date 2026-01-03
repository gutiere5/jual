

function ContentContainer() {
  const items = [
    {
      id: 2,
      clover_id: null,
      sku: '5465ad16adsfa',
      name: 'Milk',
      uom: 'each',
      category_id: null,
      vendor_id: null,
      low_stock_threshold: 10,
    },
    {
      id: 3,
      clover_id: null,
      sku: '5465aadfaadsfa',
      name: 'Apple',
      uom: 'each',
      category_id: null,
      vendor_id: null,
      low_stock_threshold: 10,
    },
    {
      id: 4,
      clover_id: null,
      sku: '546asdf3bhmadfaadsfa',
      name: 'Orange',
      uom: 'each',
      category_id: null,
      vendor_id: null,
      low_stock_threshold: 10,
    },
  ];

  return (
    <main>
      <div className="items-container">
        <h1>Inventory</h1>
        <p>Manage stock levels and item details</p>{' '}
        {items.map((item) => {
          return (
            <button key={item.id}>
              <h3>{item.name}</h3>
              <div className="item-description">
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
