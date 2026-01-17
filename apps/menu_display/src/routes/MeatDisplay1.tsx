import { useLoaderData } from "react-router-dom";
import type { Item } from "../schemas/item.schema";

function MeatDisplay1() {
  const items = useLoaderData() as Item[];

  return (
    <>
      {items.map((item) => {
        return (
          <p key={item.id}>
            {item.name} - {item.price}
          </p>
        );
      })}
    </>
  );
}

export default MeatDisplay1;
