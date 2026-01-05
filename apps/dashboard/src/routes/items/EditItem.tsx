import { Form, useLoaderData, redirect, type ActionFunctionArgs, Link } from 'react-router';
import type { Item } from '../../types';
import { itemService } from '../../services/itemServices';

export async function editItemAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const itemId = Number(params.itemId);
  const existingItem = await itemService.getById(itemId);

  if (!existingItem) {
    throw new Error(`Item with ID ${itemId} not found`);
  }

  const updatedItem: Item = {
    ...existingItem,
    name: updates.name as string,
    sku: updates.sku as string,
    uom: updates.uom as string,
    low_stock_threshold: Number(updates.low_stock_threshold),
  };

  await itemService.update(updatedItem);
  return redirect(`/items/${itemId}`);
}

export default function EditItem() {
  const item = useLoaderData() as Item;
  return (
    <Form method="post">
      <p>
        <span>Name</span>
        <input type="text" name="name" defaultValue={item.name} />
      </p>
      <p>
        <span>SKU</span>
        <input type="text" name="sku" defaultValue={item.sku} />
      </p>
      <p>
        <span>UOM</span>
        <input type="text" name="uom" defaultValue={item.uom} />
      </p>
      <p>
        <span>Low Stock Threshold</span>
        <input type="number" name="low_stock_threshold" defaultValue={item.low_stock_threshold} />
      </p>
      <p>
        <button type="submit">Save</button>
        <Link to={`/items/${item.id}`}>
          <button type="button">Cancel</button>
        </Link>
      </p>
    </Form>
  );
}
