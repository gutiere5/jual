import { Form, useLoaderData, useNavigate, type LoaderFunctionArgs } from 'react-router';
import { Link } from 'react-router-dom';
import { itemService } from '../../services/itemServices';
import type { Item } from '../../types';

export async function itemLoader({ params }: LoaderFunctionArgs) {
  const { itemId } = params as { itemId: string };
  const item = await itemService.getById(parseInt(itemId, 10));

  return item;
}

export async function action() {}

function ItemDetails() {
  let item = useLoaderData() as Item;
  let navigate = useNavigate();

  return (
    <div className="item-details-page">
      <header className="item-details-header">
        <button className="item-button" onClick={() => navigate('/')}>
          Back
        </button>
        <h1 className="">{item.name}</h1>
        <div>
          <Link to={`/items/${item.id}/edit`}>
            <button className="item-button">Edit</button>
          </Link>
          <button className="item-button">Add</button>
          <button className="item-button">Export</button>
        </div>
      </header>

      <Form method="post">
        <table className="items-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>UOM</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category_type}</td>
              <td>{item.uom}</td>
              <td>{item.quatity_remainning}</td>
            </tr>
          </tbody>
        </table>
      </Form>
    </div>
  );
}

export default ItemDetails;
